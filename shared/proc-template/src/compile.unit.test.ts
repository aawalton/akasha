import { describe, expect, it } from "bun:test"
import { compile, compileUnknown } from "./compile"
import { defineProc, sql } from "./sql"
import type { ProcDef } from "./types"

describe("compile", () => {
  it("emits a TABLE-returning proc with a default arg and explicit grants", () => {
    const proc = defineProc({
      name: "fixture_table_proc",
      args: {
        p_owner_id: { type: "text" },
        p_prev_owner_id: { type: "text", nullable: true, default: "NULL" },
      },
      returns: { kind: "table", columns: { page_type_id: "text" } },
      body: ({ p_owner_id, p_prev_owner_id }) => sql`
DECLARE
  v_x text;
BEGIN
  SELECT ${p_owner_id}, ${p_prev_owner_id} INTO v_x, v_x;
  RETURN;
END;
`,
      meta: {
        grants: { revokeFromPublic: true, grantTo: ["PUBLIC", "postgres", "service_role"] },
      },
    })
    const { sql: out } = compile(proc)
    expect(out).toBe(
      `CREATE OR REPLACE FUNCTION public.fixture_table_proc(p_owner_id text, p_prev_owner_id text DEFAULT NULL)
 RETURNS TABLE(page_type_id text)
 LANGUAGE plpgsql
AS $function$

DECLARE
  v_x text;
BEGIN
  SELECT p_owner_id, p_prev_owner_id INTO v_x, v_x;
  RETURN;
END;

$function$;

REVOKE ALL ON ROUTINE public.fixture_table_proc(p_owner_id text, p_prev_owner_id text) FROM PUBLIC;
GRANT EXECUTE ON ROUTINE public.fixture_table_proc(p_owner_id text, p_prev_owner_id text) TO PUBLIC;
GRANT EXECUTE ON ROUTINE public.fixture_table_proc(p_owner_id text, p_prev_owner_id text) TO postgres;
GRANT EXECUTE ON ROUTINE public.fixture_table_proc(p_owner_id text, p_prev_owner_id text) TO service_role;`
    )
  })

  it("emits a scalar-returning proc with default grants (postgres + service_role)", () => {
    const proc = defineProc({
      name: "fixture_scalar_proc",
      args: { p_id: { type: "text" } },
      returns: { kind: "scalar", type: "jsonb" },
      body: ({ p_id }) => sql`
DECLARE
  v_r jsonb;
BEGIN
  SELECT to_jsonb(${p_id}) INTO v_r;
  RETURN v_r;
END;
`,
    })
    const { sql: out } = compile(proc)
    expect(out).toBe(
      `CREATE OR REPLACE FUNCTION public.fixture_scalar_proc(p_id text)
 RETURNS jsonb
 LANGUAGE plpgsql
AS $function$

DECLARE
  v_r jsonb;
BEGIN
  SELECT to_jsonb(p_id) INTO v_r;
  RETURN v_r;
END;

$function$;

REVOKE ALL ON ROUTINE public.fixture_scalar_proc(p_id text) FROM PUBLIC;
GRANT EXECUTE ON ROUTINE public.fixture_scalar_proc(p_id text) TO postgres;
GRANT EXECUTE ON ROUTINE public.fixture_scalar_proc(p_id text) TO service_role;`
    )
  })

  it("emits a SETOF-returning proc", () => {
    const proc = defineProc({
      name: "fixture_setof_proc",
      args: { p_owner: { type: "text" } },
      returns: { kind: "setof", type: "jsonb" },
      body: ({ p_owner }) => sql`
BEGIN
  RETURN QUERY SELECT to_jsonb(${p_owner});
END;
`,
    })
    const { sql: out } = compile(proc)
    expect(out).toContain(`RETURNS SETOF jsonb`)
    expect(out).toContain(`SELECT to_jsonb(p_owner)`)
  })

  it("emits SECURITY DEFINER + SET search_path when meta requests them", () => {
    const proc = defineProc({
      name: "fixture_definer_proc",
      args: { p_x: { type: "text" } },
      returns: { kind: "void" },
      body: ({ p_x }) => sql`
BEGIN
  PERFORM ${p_x};
END;
`,
      meta: {
        securityDefiner: true,
        searchPath: ["pg_catalog", "public"],
      },
    })
    const { sql: out } = compile(proc)
    expect(out).toContain(` SECURITY DEFINER`)
    expect(out).toContain(` SET search_path TO 'pg_catalog', 'public'`)
    expect(out).toContain(` RETURNS void`)
  })

  it("emits IMMUTABLE marker when meta.immutable is true", () => {
    const proc = defineProc({
      name: "fixture_immutable_proc",
      args: { p_x: { type: "text" } },
      returns: { kind: "scalar", type: "text" },
      body: ({ p_x }) => sql`
BEGIN
  RETURN ${p_x};
END;
`,
      meta: { immutable: true },
    })
    const { sql: out } = compile(proc)
    expect(out).toContain(` IMMUTABLE`)
  })

  it("emits STABLE marker when meta.stable is true", () => {
    const proc = defineProc({
      name: "fixture_stable_proc",
      args: { p_x: { type: "text" } },
      returns: { kind: "scalar", type: "jsonb" },
      body: ({ p_x }) => sql`
BEGIN
  RETURN to_jsonb(${p_x});
END;
`,
      meta: { stable: true },
    })
    const { sql: out } = compile(proc)
    expect(out).toContain(` STABLE`)
    expect(out).not.toContain(` IMMUTABLE`)
  })

  it("rejects combining meta.immutable and meta.stable", () => {
    const proc = defineProc({
      name: "fixture_double_volatility",
      args: { p_x: { type: "text" } },
      returns: { kind: "void" },
      body: ({ p_x }) => sql`BEGIN PERFORM ${p_x}; END;`,
      meta: { immutable: true, stable: true },
    })
    expect(() => compile(proc)).toThrow(/mutually exclusive/)
  })

  it("uses deployedName override in CREATE / REVOKE / GRANT statements", () => {
    const proc = defineProc({
      name: "fixture_renamed",
      args: { p_x: { type: "text" } },
      returns: { kind: "scalar", type: "text" },
      body: ({ p_x }) => sql`BEGIN RETURN ${p_x}; END;`,
    })
    const { sql: out } = compile(proc, { deployedName: "fixture_renamed_v2" })
    expect(out).toContain(`CREATE OR REPLACE FUNCTION public.fixture_renamed_v2(`)
    expect(out).toContain(`REVOKE ALL ON ROUTINE public.fixture_renamed_v2(`)
    expect(out).toContain(`GRANT EXECUTE ON ROUTINE public.fixture_renamed_v2(`)
    expect(out).not.toContain(`fixture_renamed(`)
  })

  it("inlines an arg referenced multiple times — same parameter name, no aliasing", () => {
    const proc = defineProc({
      name: "fixture_dup_arg",
      args: { p_x: { type: "text" } },
      returns: { kind: "scalar", type: "text" },
      body: ({ p_x }) => sql`BEGIN RETURN ${p_x} || ${p_x}; END;`,
    })
    const { sql: out } = compile(proc)
    expect(out).toContain(`RETURN p_x || p_x;`)
  })

  it("recurses into nested sql\\`…\\` substitutions and resolves ArgRefs across boundaries", () => {
    const innerFragment = sql`SELECT v_x;`
    const proc = defineProc({
      name: "fixture_nested_template",
      args: { p_x: { type: "text" } },
      returns: { kind: "scalar", type: "text" },
      body: ({ p_x }) => sql`
DECLARE v_x text;
BEGIN
  v_x := ${p_x};
  PERFORM ${innerFragment}
  RETURN v_x;
END;
`,
    })
    const { sql: out } = compile(proc)
    expect(out).toContain(`v_x := p_x;`)
    expect(out).toContain(`PERFORM SELECT v_x;`)
  })

  it("nested fragments may carry their own ArgRefs, resolved against the outer args bag", () => {
    const proc = defineProc({
      name: "fixture_nested_argref",
      args: { p_x: { type: "text" } },
      returns: { kind: "scalar", type: "text" },
      body: ({ p_x }) => {
        const inner = sql`upper(${p_x})`
        return sql`BEGIN RETURN ${inner}; END;`
      },
    })
    const { sql: out } = compile(proc)
    expect(out).toContain(`RETURN upper(p_x);`)
  })

  it("rejects substitutions that are not ArgRef / SqlTemplate / primitive", () => {
    const proc = defineProc({
      name: "fixture_bad_sub",
      args: { p_x: { type: "text" } },
      returns: { kind: "void" },
      body: () => sql`BEGIN PERFORM ${{ junk: true }}; END;`,
    })
    expect(() => compile(proc)).toThrow(/only ArgRef \/ SqlTemplate \/ string \/ number \/ boolean/)
  })

  it("dispatches an unknown default-export through compileUnknown (public barrel surface)", () => {
    const proc: ProcDef<{ p_x: { type: "text" } }, { kind: "scalar"; type: "text" }> = defineProc({
      name: "fixture_unknown_dispatch",
      args: { p_x: { type: "text" } },
      returns: { kind: "scalar", type: "text" },
      body: ({ p_x }) => sql`BEGIN RETURN ${p_x}; END;`,
    })
    const unknownDef: unknown = proc
    const { sql: out } = compileUnknown(unknownDef)
    expect(out).toContain(`CREATE OR REPLACE FUNCTION public.fixture_unknown_dispatch(`)
    expect(out).toContain(`RETURN p_x;`)
  })

  it("compileUnknown rejects a non-ProcDef default export", () => {
    expect(() => compileUnknown({ not: "a proc def" })).toThrow(
      /default export is not a defineProc/
    )
  })
})
