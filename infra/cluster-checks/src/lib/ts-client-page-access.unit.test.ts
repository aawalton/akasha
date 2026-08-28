import { describe, expect, test } from "bun:test"
import ts from "typescript"
import { scanClientPageAccess } from "./ts-client-page-access.ts"

const scriptKindFor = (filePath: string): ts.ScriptKind =>
  filePath.endsWith(".tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS

const parse = (
  source: string,
  filePath = "temper/web/app/components/x.tsx"
): ts.SourceFile =>
  ts.createSourceFile(filePath, source, ts.ScriptTarget.Latest, true, scriptKindFor(filePath))

const countOf = (source: string, filePath?: string): number =>
  scanClientPageAccess(parse(source, filePath)).length

const USE_CLIENT = '"use client"\n'
const PA_IMPORT = 'import { getPages, upsertPage, patchPage } from "@shared/pages-access"\n'
const UI_IMPORT =
  'import { useOptimisticPatchPage } from "@shared/pages-ui/supabase/mutations/use-optimistic-patch-page"\n'

const subscription = (table: string, receiver = "supabase"): string =>
  `function f(cb) {\n` +
  `  ${receiver}\n` +
  `    .channel("pages-x")\n` +
  `    .on("postgres_changes", { event: "*", schema: "public", table: "${table}" }, cb)\n` +
  `    .subscribe()\n` +
  `}\n`

describe("scanClientPageAccess — flags unwrapped browser page access (red)", () => {
  test("unwrapped upsertPage in a use-client module is flagged", () => {
    const src =
      USE_CLIENT + PA_IMPORT + "async function f(supabase) { await upsertPage(supabase, {}) }\n"
    expect(countOf(src)).toBe(1)
  })

  test("unwrapped getPages (a read) in a use-client module is flagged", () => {
    const src =
      USE_CLIENT + PA_IMPORT + "async function f(supabase) { await getPages(supabase, {}) }\n"
    expect(countOf(src)).toBe(1)
  })

  test("raw supabase .from('pages') chain in a use-client module is flagged", () => {
    const src =
      USE_CLIENT + "async function f(supabase) { await supabase.from('pages').select('*') }\n"
    expect(countOf(src)).toBe(1)
  })

  test("multiple unwrapped calls each flagged (the use-temper-import shape: 3 writes + 1 read)", () => {
    const src =
      USE_CLIENT +
      PA_IMPORT +
      "async function f(supabase, userId) {\n" +
      "  await upsertPage(supabase, { pageTypeSlug: 'temper-account' })\n" +
      "  const rows = await getPages(supabase, { pageTypeSlug: 'temper-account-character' })\n" +
      "  await upsertPage(supabase, { pageTypeSlug: 'temper-account-character' })\n" +
      "  await upsertPage(supabase, { pageTypeSlug: 'temper-companion-progress' })\n" +
      "}\n"
    expect(countOf(src)).toBe(4)
  })

  test("callee name is reported on the finding", () => {
    const src =
      USE_CLIENT + PA_IMPORT + "async function f(supabase) { await upsertPage(supabase, {}) }\n"
    const findings = scanClientPageAccess(parse(src))
    expect(findings[0]?.callee).toBe("upsertPage")
  })

  test("each arm reports its own kind, so a refusal can name the shape it found", () => {
    const paSrc =
      USE_CLIENT + PA_IMPORT + "async function f(supabase) { await upsertPage(supabase, {}) }\n"
    expect(scanClientPageAccess(parse(paSrc))[0]?.kind).toBe("pages-access-import")

    const fromSrc =
      USE_CLIENT + "async function f(supabase) { await supabase.from('pages').select('*') }\n"
    expect(scanClientPageAccess(parse(fromSrc))[0]?.kind).toBe("raw-from-pages")

    const subSrc = USE_CLIENT + subscription("pages")
    expect(scanClientPageAccess(parse(subSrc))[0]?.kind).toBe("raw-pages-subscription")
  })
})

describe("scanClientPageAccess — hand-rolled pages realtime subscription (#11430)", () => {
  test("a postgres_changes subscription on the pages table in a use-client module is flagged", () => {
    const findings = scanClientPageAccess(parse(USE_CLIENT + subscription("pages")))
    expect(findings).toHaveLength(1)
    expect(findings[0]?.kind).toBe("raw-pages-subscription")
    expect(findings[0]?.callee).toBe("on('postgres_changes', { table: 'pages' })")
  })

  test("the same subscription in a module with no use-client directive is out of scope", () => {
    const src = subscription("pages")
    expect(countOf(src, "agents/shared/supabase-realtime.ts")).toBe(0)
  })

  test("a postgres_changes subscription on another table is not flagged", () => {
    expect(countOf(USE_CLIENT + subscription("messages"))).toBe(0)
    expect(countOf(USE_CLIENT + subscription("page_types"))).toBe(0)
  })

  test("the arm keys on the shape, not on the spelling of the client variable", () => {
    expect(countOf(USE_CLIENT + subscription("pages", "sb"))).toBe(1)
    expect(countOf(USE_CLIENT + subscription("pages", "getClient()"))).toBe(1)
    expect(countOf(USE_CLIENT + subscription("pages", "this.client"))).toBe(1)
  })

  test("a subscription nested in a useOptimistic* wrapper is NOT exempt", () => {
    const src =
      USE_CLIENT +
      UI_IMPORT +
      "function C(supabase, cb) {\n" +
      "  return useOptimisticPatchPage(() =>\n" +
      "    supabase.channel('x').on('postgres_changes', { table: 'pages' }, cb).subscribe()\n" +
      "  )\n" +
      "}\n"
    const findings = scanClientPageAccess(parse(src))
    expect(findings).toHaveLength(1)
    expect(findings[0]?.kind).toBe("raw-pages-subscription")
  })

  test("a file holding BOTH a from('pages') query and a subscription reports both", () => {
    const src =
      USE_CLIENT +
      "async function read(supabase) { return supabase.from('pages').select('*') }\n" +
      subscription("pages")
    const kinds = scanClientPageAccess(parse(src)).map((f) => f.kind)
    expect(kinds).toEqual(["raw-from-pages", "raw-pages-subscription"])
  })

  test("an `on` call that is not a postgres_changes bind is not flagged", () => {
    const src =
      USE_CLIENT +
      "function f(supabase, cb) { supabase.channel('x').on('broadcast', { event: 'pages' }, cb).subscribe() }\n"
    expect(countOf(src)).toBe(0)
  })

  test("a postgres_changes bind whose second argument is not an object literal is not flagged", () => {
    const src =
      USE_CLIENT +
      "function f(supabase, filter, cb) { supabase.on('postgres_changes', filter, cb) }\n"
    expect(countOf(src)).toBe(0)
  })
})

describe("scanClientPageAccess — the escaping spellings (red)", () => {
  const NS_IMPORT = 'import * as pagesAccess from "@shared/pages-access"\n'

  test("a write called off a namespace import is flagged", () => {
    const src =
      USE_CLIENT +
      NS_IMPORT +
      "async function f(supabase) { await pagesAccess.upsertPage(supabase, {}) }\n"
    expect(countOf(src)).toBe(1)
  })

  test("a read called off a namespace import is flagged", () => {
    const src =
      USE_CLIENT +
      NS_IMPORT +
      "async function f(supabase) { await pagesAccess.getPages(supabase, {}) }\n"
    expect(countOf(src)).toBe(1)
  })

  test("the namespaced callee is reported as written, so the refusal names the spelling", () => {
    const src =
      USE_CLIENT +
      NS_IMPORT +
      "async function f(supabase) { await pagesAccess.patchPage(supabase, {}) }\n"
    const findings = scanClientPageAccess(parse(src))
    expect(findings[0]?.callee).toBe("pagesAccess.patchPage")
  })

  test("a namespace import under a deep specifier is flagged too", () => {
    const src =
      USE_CLIENT +
      'import * as pa from "@shared/pages-access/pg"\n' +
      "async function f(supabase) { await pa.upsertPage(supabase, {}) }\n"
    expect(countOf(src)).toBe(1)
  })

  test("a backtick table name in a .from chain is flagged", () => {
    const src =
      USE_CLIENT + "async function f(supabase) { await supabase.from(`pages`).select('*') }\n"
    expect(countOf(src)).toBe(1)
  })

  test("the double-quoted table name is flagged alongside the single-quoted one", () => {
    const src =
      USE_CLIENT + 'async function f(supabase) { await supabase.from("pages").select("*") }\n'
    expect(countOf(src)).toBe(1)
  })
})

describe("scanClientPageAccess — the widened arms stay narrow (green)", () => {
  test("a namespace import used only for types raises nothing", () => {
    const src =
      USE_CLIENT +
      'import type * as pagesAccess from "@shared/pages-access"\n' +
      "let c: pagesAccess.PageAccessClient\n"
    expect(countOf(src)).toBe(0)
  })

  test("a member call off an unrelated namespace import is not flagged", () => {
    const src =
      USE_CLIENT +
      'import * as utils from "@shared/utils-narrow"\n' +
      "function f(x) { return utils.upsertPage(x) }\n"
    expect(countOf(src)).toBe(0)
  })

  test("a namespaced pages-access call inside a useOptimistic* wrapper is exempt", () => {
    const src =
      USE_CLIENT +
      'import * as pagesAccess from "@shared/pages-access"\n' +
      UI_IMPORT +
      "function C(supabase) {\n" +
      "  return useOptimisticPatchPage((args) => pagesAccess.patchPage(supabase, args))\n" +
      "}\n"
    expect(countOf(src)).toBe(0)
  })

  test("a .from chain on another table is not flagged in either spelling", () => {
    const src =
      USE_CLIENT +
      "async function f(supabase) {\n" +
      "  await supabase.from(`page_types`).select('*')\n" +
      "  await supabase.from('properties').select('*')\n" +
      "}\n"
    expect(countOf(src)).toBe(0)
  })

  test("an interpolated table name is not guessed at", () => {
    const src =
      USE_CLIENT +
      "async function f(supabase, t) { await supabase.from(`${t}pages`).select('*') }\n"
    expect(countOf(src)).toBe(0)
  })
})

describe("scanClientPageAccess — compliant / out-of-scope code (green)", () => {
  test("pages-access call INSIDE a useOptimistic* wrapper is exempt", () => {
    const src =
      USE_CLIENT +
      PA_IMPORT +
      UI_IMPORT +
      "function C(supabase) {\n" +
      "  const optimisticPatch = useOptimisticPatchPage((args) => patchPage(supabase, args))\n" +
      "  return optimisticPatch\n" +
      "}\n"
    expect(countOf(src)).toBe(0)
  })

  test("a non-use-client (server) module is out of scope even with a direct call", () => {
    const src = PA_IMPORT + "export async function loader(sb) { return getPages(sb, {}) }\n"
    expect(countOf(src, "temper/web/app/routes/api.items.tsx")).toBe(0)
  })

  test("a use-client module calling a non-pages-access function is not flagged", () => {
    const src =
      USE_CLIENT + "import { doThing } from '@some/lib'\nfunction f(x) { return doThing(x) }\n"
    expect(countOf(src)).toBe(0)
  })

  test("a type-only import with no call is not flagged", () => {
    const src =
      USE_CLIENT +
      'import type { PageAccessClient } from "@shared/pages-access"\nlet c: PageAccessClient\n'
    expect(countOf(src)).toBe(0)
  })

  test("an inline type specifier is not treated as a callable pages-access import", () => {
    const src =
      USE_CLIENT +
      'import { type PageAccessClient } from "@shared/pages-access"\nlet c: PageAccessClient\n'
    expect(countOf(src)).toBe(0)
  })
})

describe("scanClientPageAccess — output shape", () => {
  test("reports 1-indexed line/column and the source file name", () => {
    const src =
      USE_CLIENT + PA_IMPORT + "async function f(supabase) {\n  await upsertPage(supabase, {})\n}\n"
    const findings = scanClientPageAccess(
      parse(src, "temper/web/app/components/import/use-temper-import.ts")
    )
    expect(findings).toHaveLength(1)
    expect(findings[0]?.file).toBe("temper/web/app/components/import/use-temper-import.ts")
    expect(findings[0]?.line).toBe(4)
    expect(typeof findings[0]?.column).toBe("number")
  })
})
