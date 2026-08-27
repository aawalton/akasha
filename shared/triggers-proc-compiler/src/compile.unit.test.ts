import { describe, expect, it } from "bun:test"
import { compileSource } from "./compile"

const trigger = {
  securityDefiner: false,
  searchPath: [] satisfies readonly string[],
  grantPublic: true,
}

describe("compileSource (trigger-proc, per-construct)", () => {
  it("lowers ctx.NEW.<field> = ctx.now() to NEW.<snake_field> := now();", () => {
    const source = `
      import type { TriggerProcCtx, TriggerReturn } from "@shared/proc-compiler/trigger-ctx"
      type Row = { updatedAt: string }
      export function fixture(ctx: TriggerProcCtx<Row>): TriggerReturn {
        ctx.NEW.updatedAt = ctx.now()
        return "NEW"
      }
    `
    const { sql } = compileSource({
      source,
      sourcePath: "/__fixtures__/set-updated-at-fixture.ts",
      deployedName: "fixture_set_updated_at",
      trigger,
    })
    expect(sql).toContain("CREATE OR REPLACE FUNCTION public.fixture_set_updated_at()")
    expect(sql).toContain("RETURNS trigger")
    expect(sql).toContain("NEW.updated_at := now();")
    expect(sql).toContain("RETURN NEW;")
  })

  it("lowers ctx.notify with template-literal channel to PERFORM pg_notify(... || NEW.<field>, NEW.<field>);", () => {
    const source = `
      import type { TriggerProcCtx, TriggerReturn } from "@shared/proc-compiler/trigger-ctx"
      type Row = { channelKey: string; rowName: string }
      export function fixture(ctx: TriggerProcCtx<Row>): TriggerReturn {
        ctx.notify(\`row_changed_\${ctx.NEW.channelKey}\`, ctx.NEW.rowName)
        return "NEW"
      }
    `
    const { sql } = compileSource({
      source,
      sourcePath: "/__fixtures__/notify-row-changed-fixture.ts",
      deployedName: "fixture_notify_row_changed",
      trigger: {
        securityDefiner: true,
        searchPath: ["pg_catalog", "public"],
        grantPublic: false,
      },
    })
    expect(sql).toContain("PERFORM pg_notify('row_changed_' || NEW.channel_key, NEW.row_name);")
    expect(sql).toContain("SECURITY DEFINER")
    expect(sql).toContain("SET search_path TO 'pg_catalog', 'public'")
  })

  it('lowers return "OLD" / "NULL" sentinels to RETURN OLD; / RETURN NULL;', () => {
    const sourceOld = `
      import type { TriggerProcCtx, TriggerReturn } from "@shared/proc-compiler/trigger-ctx"
      type Row = { id: string }
      export function fixture(_ctx: TriggerProcCtx<Row>): TriggerReturn {
        return "OLD"
      }
    `
    const out1 = compileSource({
      source: sourceOld,
      sourcePath: "/__fixtures__/old.ts",
      deployedName: "fixture_old",
      trigger,
    })
    expect(out1.sql).toContain("RETURN OLD;")

    const sourceNull = `
      import type { TriggerProcCtx, TriggerReturn } from "@shared/proc-compiler/trigger-ctx"
      type Row = { id: string }
      export function fixture(_ctx: TriggerProcCtx<Row>): TriggerReturn {
        return "NULL"
      }
    `
    const out2 = compileSource({
      source: sourceNull,
      sourcePath: "/__fixtures__/null.ts",
      deployedName: "fixture_null",
      trigger,
    })
    expect(out2.sql).toContain("RETURN NULL;")
  })

  it("lowers `if (cond) { body }` to `IF <cond> THEN <body> END IF;` with === → IS NOT DISTINCT FROM, || → OR, null → NULL, bare ctx.OLD → OLD", () => {
    const source = `
      import type { TriggerProcCtx, TriggerReturn } from "@shared/proc-compiler/trigger-ctx"
      type Row = { updatedAt: string }
      export function fixture(ctx: TriggerProcCtx<Row>): TriggerReturn {
        if (ctx.OLD === null || ctx.NEW.updatedAt === ctx.OLD.updatedAt) {
          ctx.NEW.updatedAt = ctx.now()
        }
        return "NEW"
      }
    `
    const { sql } = compileSource({
      source,
      sourcePath: "/__fixtures__/set-updated-at-preserve-fixture.ts",
      deployedName: "fixture_set_updated_at_preserve",
      trigger,
    })
    expect(sql).toContain(
      "IF (OLD IS NOT DISTINCT FROM NULL) OR (NEW.updated_at IS NOT DISTINCT FROM OLD.updated_at) THEN"
    )
    expect(sql).toContain("NEW.updated_at := now();")
    expect(sql).toContain("END IF;")
    expect(sql).toContain("RETURN NEW;")
  })

  it("lowers ctx.currentSetting(key, true) to current_setting(key, true) with a boolean literal (#14636 no-touch signal)", () => {
    const source = `
      import type { TriggerProcCtx, TriggerReturn } from "@shared/proc-compiler/trigger-ctx"
      type Row = { updatedAt: string }
      export function fixture(ctx: TriggerProcCtx<Row>): TriggerReturn {
        if (ctx.currentSetting("app.skip_updated_at_touch", true) !== "on") {
          ctx.NEW.updatedAt = ctx.now()
        }
        return "NEW"
      }
    `
    const { sql } = compileSource({
      source,
      sourcePath: "/__fixtures__/current-setting-fixture.ts",
      deployedName: "fixture_current_setting",
      trigger,
    })
    expect(sql).toContain(
      "IF current_setting('app.skip_updated_at_touch', true) IS DISTINCT FROM 'on' THEN"
    )
    expect(sql).toContain("NEW.updated_at := now();")
    expect(sql).toContain("RETURN NEW;")
  })

  it("rejects `if` with an `else` arm (single-arm only until rule-of-three)", () => {
    const source = `
      import type { TriggerProcCtx, TriggerReturn } from "@shared/proc-compiler/trigger-ctx"
      type Row = { updatedAt: string }
      export function fixture(ctx: TriggerProcCtx<Row>): TriggerReturn {
        if (ctx.OLD === null) {
          ctx.NEW.updatedAt = ctx.now()
        } else {
          ctx.NEW.updatedAt = ctx.now()
        }
        return "NEW"
      }
    `
    expect(() =>
      compileSource({
        source,
        sourcePath: "/__fixtures__/if-else.ts",
        deployedName: "fixture_if_else",
        trigger,
      })
    ).toThrow(/else \/ else if not supported/)
  })

  it("rejects `if` without a brace block", () => {
    const source = `
      import type { TriggerProcCtx, TriggerReturn } from "@shared/proc-compiler/trigger-ctx"
      type Row = { updatedAt: string }
      export function fixture(ctx: TriggerProcCtx<Row>): TriggerReturn {
        if (ctx.OLD === null) ctx.NEW.updatedAt = ctx.now()
        return "NEW"
      }
    `
    expect(() =>
      compileSource({
        source,
        sourcePath: "/__fixtures__/if-no-brace.ts",
        deployedName: "fixture_if_no_brace",
        trigger,
      })
    ).toThrow(/if-body must be a brace block/)
  })

  it("rejects loose equality (== / !=) — strict only", () => {
    const source = `
      import type { TriggerProcCtx, TriggerReturn } from "@shared/proc-compiler/trigger-ctx"
      type Row = { updatedAt: string }
      export function fixture(ctx: TriggerProcCtx<Row>): TriggerReturn {
        if (ctx.NEW.updatedAt == ctx.NEW.updatedAt) {
          ctx.NEW.updatedAt = ctx.now()
        }
        return "NEW"
      }
    `
    expect(() =>
      compileSource({
        source,
        sourcePath: "/__fixtures__/loose-eq.ts",
        deployedName: "fixture_loose_eq",
        trigger,
      })
    ).toThrow(/use === \/ !== \(strict\)/)
  })

  it("rejects an unsupported return-sentinel literal", () => {
    const source = `
      import type { TriggerProcCtx, TriggerReturn } from "@shared/proc-compiler/trigger-ctx"
      type Row = { id: string }
      export function fixture(_ctx: TriggerProcCtx<Row>): TriggerReturn {
        return "BOGUS"
      }
    `
    expect(() =>
      compileSource({
        source,
        sourcePath: "/__fixtures__/bad-sentinel.ts",
        deployedName: "fixture_bad_sentinel",
        trigger,
      })
    ).toThrow(/trigger return must be one of/)
  })

  it("rejects a source with no top-level exported function", () => {
    const source = `
      // intentionally empty — no exported function declaration
    `
    expect(() =>
      compileSource({
        source,
        sourcePath: "/__fixtures__/no-export.ts",
        deployedName: "fixture_no_export",
        trigger,
      })
    ).toThrow(/no top-level exported function/)
  })
})
