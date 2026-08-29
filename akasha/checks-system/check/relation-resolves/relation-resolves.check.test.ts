import { afterAll, expect, test } from "bun:test"
import { appendFileSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { dirname, join } from "node:path"
import type { Judged, Leaving } from "../../judging.module.code.ts"
import {
  danglingIn,
  knownAcross,
  mortalityIn,
  namersOf,
  pageTypeOf,
  relationProperties,
  relationResolves,
} from "./relation-resolves.check.code.ts"

const INDEX = join(".git", "data", "index")

const A = "akasha/t/a.note.ts"

const D = "akasha/t/d.domain.ts"

const E = "akasha/t/e.domain.ts"

const OTHER = "akasha/t/other.domain.ts"

const S = "akasha/t/s.spark.ts"

const T = "akasha/t/t.spark.ts"

const A_ID = "01a04d99-71ca-7e06-8000-000000000001"

const D_ID = "01a04d99-71ca-7e06-8000-000000000002"

const E_ID = "01a04d99-71ca-7e06-8000-000000000003"

const OTHER_ID = "01a04d99-71ca-7e06-8000-000000000004"

const NOWHERE_ID = "01a04d99-71ca-7e06-8000-00000000ffff"

const S_ID = "01a04d99-71ca-7e06-8000-000000000005"

const T_ID = "01a04d99-71ca-7e06-8000-000000000006"

const TYPES: readonly (readonly [string, string | null, boolean])[] = [
  ["page-type", null, false],
  ["domain", "page-type/page-type", false],
  ["note", "page-type/domain", false],
  ["spark", "page-type/domain", true],
]

const SCHEMA: Record<string, Record<string, string | null>> = {
  "page-type-slug": { kind: "relation", targetPageTypeSlug: "page-type", entrySlug: null },
  "domain-slug": { kind: "relation", targetPageTypeSlug: "domain", entrySlug: null },
  "spark-slug": { kind: "relation", targetPageTypeSlug: "spark", entrySlug: null },
  "part-slugs": { kind: "list", targetPageTypeSlug: null, entrySlug: "domain-slug" },
  definition: { kind: "text", targetPageTypeSlug: null, entrySlug: null },
}

const held: string[] = []

afterAll(() => {
  for (const one of held) rmSync(one, { recursive: true, force: true })
})

function put(root: string, at: string, body: string): void {
  const full = join(root, at)
  mkdirSync(dirname(full), { recursive: true })
  writeFileSync(full, body, "utf8")
}

function filed(root: string, at: string, line: string): void {
  const full = join(root, INDEX, at)
  mkdirSync(dirname(full), { recursive: true })
  appendFileSync(full, `${line}\n`, "utf8")
}

function stating(id: string, slug: string, pageTypeSlug: string, stated: string = ""): string {
  return `export const it = { id: "${id}", slug: "${slug}", pageTypeSlug: "${pageTypeSlug}"${stated} }\n`
}

function standing(root: string, path: string, id: string, pageTypeSlug: string, slug: string): void {
  const line = JSON.stringify({ path, id })
  filed(root, join("identity", "page", "id", `${id}.jsonl`), line)
  filed(root, join("identity", pageTypeSlug, "slug", `${slug}.jsonl`), line)
  filed(root, join("identity", "page", "path", `${path}.jsonl`), line)
}

function naming(root: string, target: string, propertySlug: string, id: string, path: string): void {
  filed(root, join("relation", "page", "id", target, propertySlug, `${id}.jsonl`), JSON.stringify({ path }))
}

function rooted(carrying: boolean = true): string {
  const root = mkdtempSync(join(tmpdir(), "akasha-relation-resolves-"))
  held.push(root)
  let count = 0
  for (const [slug, extendsSlug, mortal] of TYPES) {
    count += 1
    const path = `akasha/t/${slug}.page-type.ts`
    const id = `01a04d99-71ca-7e06-9000-00000000000${count}`
    const said = extendsSlug === null ? "null" : `"${extendsSlug}"`
    const dies = mortal ? ", mortal: true" : ""
    put(root, path, stating(id, slug, "page-type", `, extendsSlug: ${said}${dies}`))
    standing(root, path, id, "page-type", slug)
  }
  for (const [slug, shape] of Object.entries(SCHEMA)) {
    filed(root, join("schema", "page-property-type", "slug", `${slug}.jsonl`), JSON.stringify(shape))
  }
  if (carrying) standing(root, D, D_ID, "domain", "d")
  return root
}

function over(root: string, changed: readonly string[], bodies: Record<string, string | null>): Leaving {
  const encoder = new TextEncoder()
  return {
    root,
    changed,
    at: (path) => {
      const said = bodies[path]
      if (said === undefined || said === null) return null
      return encoder.encode(said)
    },
  }
}

function note(stated: string): Record<string, string | null> {
  return { [A]: stating(A_ID, "a", "note", stated) }
}

function spark(stated: string): Record<string, string | null> {
  return { [S]: stating(S_ID, "s", "spark", stated) }
}

test("a page naming a page the index already carries is let through", () => {
  const root = rooted()
  expect(relationResolves(over(root, [A], note(', domainSlug: "domain/d"')))).toEqual([])
})

test("a page naming a slug that reaches nothing is refused, and the refusal names the property", () => {
  const root = rooted()
  expect(relationResolves(over(root, [A], note(', domainSlug: "domain/gone"')))).toEqual([
    { path: A, reason: "states `domain-slug`, and no `domain` carries the slug `gone`" },
  ])
})

test("a bare name is looked for under every page type admitting the target", () => {
  const root = rooted()
  expect(relationResolves(over(root, [A], note(', domainSlug: "d"')))).toEqual([])
  expect(relationResolves(over(root, [A], note(', domainSlug: "nope"')))).toEqual([
    { path: A, reason: "states `domain-slug`, and no page admitting `domain` carries the slug `nope`" },
  ])
})

test("an id reaching no page is refused, and an id reaching one is let through", () => {
  const root = rooted()
  expect(relationResolves(over(root, [A], note(`, domainSlug: "${D_ID}"`)))).toEqual([])
  expect(relationResolves(over(root, [A], note(`, domainSlug: "${NOWHERE_ID}"`)))).toEqual([
    { path: A, reason: `states \`domain-slug\`, and no page carries the id \`${NOWHERE_ID}\`` },
  ])
})

test("an id reaches a page the change carries, and reaches nothing it takes away", () => {
  const root = rooted()
  const both = { ...note(`, domainSlug: "${E_ID}"`), [E]: stating(E_ID, "e", "domain") }
  expect(relationResolves(over(root, [A, E], both))).toEqual([])
  const taken = { ...note(`, domainSlug: "${D_ID}"`), [D]: null }
  expect(relationResolves(over(root, [A, D], taken))).toEqual([
    { path: A, reason: `states \`domain-slug\`, and no page carries the id \`${D_ID}\`` },
  ])
})

test("the page type a page states is a relation like any other", () => {
  const root = rooted()
  const bodies = { [A]: stating(A_ID, "a", "typo") }
  expect(relationResolves(over(root, [A], bodies))).toEqual([
    { path: A, reason: "states `page-type-slug`, and no page admitting `page-type` carries the slug `typo`" },
  ])
})

test("every name in a list is judged, not only the first", () => {
  const root = rooted()
  const said = relationResolves(over(root, [A], note(', partSlugs: ["domain/d", "domain/gone"]')))
  expect(said).toEqual([
    { path: A, reason: "states `part-slugs`, and no `domain` carries the slug `gone`" },
  ])
})

test("a property the schema does not call a relation is never resolved", () => {
  const root = rooted()
  expect(relationResolves(over(root, [A], note(', definition: "domain/gone"')))).toEqual([])
})

test("a page and the page it names land together when the change carries both", () => {
  const root = rooted()
  const bodies = {
    ...note(', domainSlug: "domain/e"'),
    [E]: stating(E_ID, "e", "domain"),
  }
  expect(relationResolves(over(root, [A, E], bodies))).toEqual([])
  expect(relationResolves(over(root, [A], note(', domainSlug: "domain/e"')))).toEqual([
    { path: A, reason: "states `domain-slug`, and no `domain` carries the slug `e`" },
  ])
})

test("a change taking away a page refuses the page still naming it, though the change never names it", () => {
  const root = rooted()
  naming(root, D_ID, "domain-slug", A_ID, A)
  standing(root, A, A_ID, "note", "a")
  const bodies = { ...note(', domainSlug: "domain/d"'), [D]: null }
  expect(relationResolves(over(root, [D], bodies))).toEqual([
    { path: A, reason: "states `domain-slug`, and no `domain` carries the slug `d`" },
  ])
})

test("a change taking away the page and the page naming it together is silent", () => {
  const root = rooted()
  naming(root, D_ID, "domain-slug", A_ID, A)
  standing(root, A, A_ID, "note", "a")
  expect(relationResolves(over(root, [D, A], { [A]: null, [D]: null }))).toEqual([])
})

test("a change taking away a page nothing names is silent", () => {
  const root = rooted()
  standing(root, OTHER, OTHER_ID, "domain", "other")
  expect(relationResolves(over(root, [OTHER], { [OTHER]: null }))).toEqual([])
})

test("a name narrowing to more than one page is refused, not taken as reached", () => {
  const root = rooted()
  standing(root, OTHER, OTHER_ID, "domain", "d")
  expect(relationResolves(over(root, [A], note(', domainSlug: "domain/d"')))).toEqual([
    {
      path: A,
      reason: `states \`domain-slug\`, and \`domain/d\` narrows to 2 pages and must name its page type — ${D}, ${OTHER}`,
    },
  ])
})

test("a change rewriting a page's slug takes the old slug away with it", () => {
  const root = rooted()
  const bodies = {
    ...note(', domainSlug: "domain/d"'),
    [D]: stating(D_ID, "renamed", "domain"),
  }
  expect(relationResolves(over(root, [A, D], bodies))).toEqual([
    { path: A, reason: "states `domain-slug`, and no `domain` carries the slug `d`" },
  ])
})

test("a change naming no page and taking nothing away asks the index nothing", () => {
  const root = rooted()
  expect(relationResolves(over(root, ["akasha/t/loose.txt"], { "akasha/t/loose.txt": "held" }))).toEqual([])
})

test("which properties are relations is read from the schema in the index", () => {
  const root = rooted()
  const known = knownAcross(over(root, [], {}), [])
  expect(relationProperties(root, known)).toEqual([
    "domain-slug",
    "page-type-slug",
    "part-slugs",
    "spark-slug",
  ])
})

test("the pages to judge for a page taken away are the ones the reverse edges name", () => {
  const root = rooted()
  naming(root, D_ID, "domain-slug", A_ID, A)
  standing(root, A, A_ID, "note", "a")
  const leaving = over(root, [D], { [D]: null })
  expect(namersOf(leaving, ["domain-slug", "part-slugs"])).toEqual([A])
  expect(namersOf(over(root, [D], { [D]: "held" }), ["domain-slug"])).toEqual([])
})

test("a refusal is laid on the page that names, and one is raised for each name", () => {
  const root = rooted()
  const known = knownAcross(over(root, [], {}), [])
  const value = { pageTypeSlug: "note", partSlugs: ["gone", "away"] }
  expect(danglingIn(A, value, known, mortalityIn(root, known)).map((one) => one.reason)).toEqual([
    "states `part-slugs`, and no page admitting `domain` carries the slug `gone`",
    "states `part-slugs`, and no page admitting `domain` carries the slug `away`",
  ])
})

const NOT_MORTAL = "states `spark-slug`, and a page that is not mortal cannot name a mortal `spark`"

const REACHED_MORTAL =
  "states `domain-slug`, and a page that is not mortal cannot name a mortal `spark`"

test("a page that is not mortal naming a mortal page type is refused, reached or not", () => {
  const root = rooted()
  standing(root, S, S_ID, "spark", "s")
  expect(relationResolves(over(root, [A], note(', sparkSlug: "spark/s"')))).toEqual([
    { path: A, reason: NOT_MORTAL },
  ])
  expect(relationResolves(over(root, [A], note(', sparkSlug: "spark/gone"')))).toEqual([
    { path: A, reason: NOT_MORTAL },
  ])
})

test("a mortal page naming a page that reaches nothing is silent", () => {
  const root = rooted()
  expect(relationResolves(over(root, [S], spark(', domainSlug: "domain/gone"')))).toEqual([])
})

test("a mortal page naming a mortal page that reaches nothing is silent", () => {
  const root = rooted()
  expect(relationResolves(over(root, [S], spark(', sparkSlug: "spark/gone"')))).toEqual([])
})

test("a change taking a mortal page away is silent though a page still names it", () => {
  const root = rooted()
  standing(root, S, S_ID, "spark", "s")
  naming(root, S_ID, "spark-slug", T_ID, T)
  standing(root, T, T_ID, "spark", "t")
  const bodies = { [T]: stating(T_ID, "t", "spark", ', sparkSlug: "spark/s"'), [S]: null }
  expect(relationResolves(over(root, [S], bodies))).toEqual([])
})

function reaching(root: string, stated: string): readonly Judged[] {
  return relationResolves(over(root, [A], note(stated)))
}

const refusing = [{ path: A, reason: REACHED_MORTAL }]

test("a target that is not mortal is refused for the mortal page the name reaches", () => {
  const root = rooted()
  standing(root, S, S_ID, "spark", "s")
  expect(reaching(root, ', domainSlug: "spark/s"')).toEqual(refusing)
  expect(reaching(root, ', domainSlug: "s"')).toEqual(refusing)
  expect(reaching(root, `, domainSlug: "${S_ID}"`)).toEqual(refusing)
  expect(reaching(root, ', domainSlug: "domain/d"')).toEqual([])
})

test("a mortal page the change itself carries is read for its page type too", () => {
  const root = rooted()
  const bodies = { ...note(', domainSlug: "spark/s"'), [S]: stating(S_ID, "s", "spark") }
  expect(relationResolves(over(root, [A, S], bodies))).toEqual(refusing)
})

test("every name in a list reaching a mortal page is refused, one refusal each", () => {
  const root = rooted()
  standing(root, S, S_ID, "spark", "s")
  standing(root, T, T_ID, "spark", "t")
  const said = reaching(root, ', partSlugs: ["spark/s", "spark/t"]')
  const one = "states `part-slugs`, and a page that is not mortal cannot name a mortal `spark`"
  expect(said).toEqual([{ path: A, reason: one }, { path: A, reason: one }])
})

test("a mortal page reaching a mortal page through a target that is not is silent", () => {
  const root = rooted()
  standing(root, S, S_ID, "spark", "s")
  const bodies = { [T]: stating(T_ID, "t", "spark", ', domainSlug: "spark/s"') }
  expect(relationResolves(over(root, [T], bodies))).toEqual([])
})

test("a name reaching nothing under a target that is not mortal is a plain dangle", () => {
  const root = rooted()
  expect(reaching(root, ', domainSlug: "spark/gone"')).toEqual([
    { path: A, reason: "states `domain-slug`, and no `spark` carries the slug `gone`" },
  ])
})

test("the page type of a reached page is read from its path, not from a page load", () => {
  expect(pageTypeOf("akasha/t/s.spark.ts")).toBe("spark")
  expect(pageTypeOf("akasha/t/held.ts")).toBe(null)
})

test("the check reads the index under the root it was given, and no other", () => {
  const named = rooted()
  const bare = rooted(false)
  const bodies = note(', domainSlug: "domain/d"')
  expect(relationResolves(over(named, [A], bodies))).toEqual([])
  expect(relationResolves(over(bare, [A], bodies))).toEqual([
    { path: A, reason: "states `domain-slug`, and no `domain` carries the slug `d`" },
  ])
})
