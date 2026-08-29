import { afterAll, expect, test } from "bun:test"
import { mkdirSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { speltIn } from "../../../code-system/code-rule/code-rule.module.code.ts"
import { scratchWorld } from "../../../command-system/scratching/scratching.module.code.ts"
import type { Leaving } from "../../judging/judging.module.code.ts"
import type { Said } from "./no-rule-in-two-files.check.code.ts"
import { everySpeltIn, noRuleInTwoFiles, reasonsIn } from "./no-rule-in-two-files.check.code.ts"

const CAMEL = `function camel(slug: string): string {
  return slug.replace(/-([a-z0-9])/g, (_, first: string) => first.toUpperCase())
}
`

const EXPORTED_AS = `export function exportedAs(slug: string): string {
  return slug.replace(/-([a-z0-9])/g, (_, one: string) => one.toUpperCase())
}
`

const WIDEN = `function widen(one: string): string {
  return one.padEnd(80, " ")
}
`

type Held = { readonly path: string; readonly text: string }

function standing(held: readonly Held[]): ReadonlyMap<string, readonly Said[]> {
  const found = new Map<string, Said[]>()
  for (const one of held) {
    for (const each of speltIn(one.path, one.text)) {
      const already = found.get(each.rule) ?? []
      found.set(each.rule, [...already, { path: one.path, name: each.name }])
    }
  }
  return found
}

test("a rule standing in another file is refused, and the refusal names that file", () => {
  const every = standing([
    { path: "one.ts", text: CAMEL },
    { path: "two.module.code.ts", text: EXPORTED_AS },
  ])
  const said = reasonsIn("one.ts", CAMEL, every)
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("`camel` says what `exportedAs` in two.module.code.ts says")
})

test("a rule no other file spells is passed over", () => {
  const every = standing([
    { path: "one.ts", text: WIDEN },
    { path: "two.module.code.ts", text: EXPORTED_AS },
  ])
  expect(reasonsIn("one.ts", WIDEN, every)).toEqual([])
})

test("neither file is the owner, so a rule in two files refuses both", () => {
  const every = standing([
    { path: "one.ts", text: CAMEL },
    { path: "two.ts", text: EXPORTED_AS },
  ])
  expect(reasonsIn("one.ts", CAMEL, every)).toHaveLength(1)
  expect(reasonsIn("two.ts", EXPORTED_AS, every)).toHaveLength(1)
})

test("a rule standing in more than one other file names one and counts the rest", () => {
  const every = standing([
    { path: "one.ts", text: CAMEL },
    { path: "two.ts", text: EXPORTED_AS },
    { path: "three.ts", text: EXPORTED_AS },
  ])
  const said = reasonsIn("one.ts", CAMEL, every)
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("and in 1 more")
})

test("a file saying the same thing twice is not judged here, one file being one place", () => {
  const both = `${CAMEL}\n${EXPORTED_AS}`
  expect(reasonsIn("one.ts", both, standing([{ path: "one.ts", text: both }]))).toEqual([])
})

test("a rule spelled inline is not seen, because only a function is read", () => {
  const inline = `const camel = one.slug.replace(/-([a-z0-9])/g, (_, first: string) => first.toUpperCase())\n`
  const every = standing([{ path: "two.module.code.ts", text: EXPORTED_AS }])
  expect(reasonsIn("one.ts", inline, every)).toEqual([])
})

const INDEX = join(".git", "data", "index")

const ID = "01a04d86-434f-75ff-8000-00000000000"

const KINDS = ["module", "page-type", "text-property", "file-property"]

const scratch = scratchWorld()

afterAll(scratch.sweep)

function filed(root: string, at: string, line: string): void {
  const full = join(root, INDEX, at)
  mkdirSync(dirname(full), { recursive: true })
  writeFileSync(full, `${line}\n`, "utf8")
}

function property(root: string, slug: string, pageTypeSlug: string, unique: string | null): void {
  filed(
    root,
    join("schema", "page-property", "slug", `${slug}.jsonl`),
    JSON.stringify({ pageTypeSlug, targetPageTypeSlug: null, unique })
  )
}

function rooted(): string {
  const root = scratch.rootFor("akasha-two-files-")
  for (const one of KINDS) {
    filed(
      root,
      join("identity", "page-type", "slug", `${one}.jsonl`),
      JSON.stringify({ path: `akasha/t/${one}.page-type.ts`, id: `${ID}${one.length}` })
    )
  }
  property(root, "id", "text-property", "always")
  property(root, "slug", "text-property", "within-page-type")
  property(root, "code", "file-property", null)
  filed(
    root,
    join("path", "akasha", "t", "standing.module.ts.jsonl"),
    JSON.stringify({ path: "akasha/t/standing.module.ts", id: `${ID}9` })
  )
  return root
}

const ONE_CODE = "akasha/b/one.module.code.ts"

const TWO_CODE = "akasha/c/two.module.code.ts"

function pageBody(slug: string, last: string): Uint8Array {
  return new TextEncoder().encode(
    `export const it = { id: "${ID}${last}", slug: "${slug}", pageTypeSlug: "module", code: "ts" }\n`
  )
}

function bothArriving(root: string): Leaving {
  const bodies: Record<string, Uint8Array> = {
    "akasha/b/one.module.ts": pageBody("one", "1"),
    [ONE_CODE]: new TextEncoder().encode(CAMEL),
    "akasha/c/two.module.ts": pageBody("two", "2"),
    [TWO_CODE]: new TextEncoder().encode(EXPORTED_AS),
  }
  return {
    root,
    changed: ["akasha/b/one.module.ts", ONE_CODE, "akasha/c/two.module.ts", TWO_CODE],
    at: (path: string): Uint8Array | null => bodies[path] ?? null,
    was: (): null => null,
  }
}

test("the files a change brings stand among those a rule is looked for in", () => {
  const every = everySpeltIn(bothArriving(rooted()))
  const said = [...every.values()].flat().map((one) => one.path)
  expect(said.sort()).toEqual([ONE_CODE, TWO_CODE])
})

test("two files arriving in one change, both spelling one rule, are both refused", () => {
  const said = noRuleInTwoFiles(bothArriving(rooted()))
  expect(said.map((one) => one.path).sort()).toEqual([ONE_CODE, TWO_CODE])
  expect(said[0]?.reason).toContain("one rule belongs in one file")
})
