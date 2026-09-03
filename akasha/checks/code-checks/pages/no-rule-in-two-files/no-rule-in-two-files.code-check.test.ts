import { afterAll, expect, test } from "bun:test"
import { speltIn } from "@akasha/code-system/code-rule"
import { scratchWorld } from "@akasha/command-system/scratching"
import type { Change } from "@akasha/pages-system/change"
import { shadowFor } from "@akasha/pages-system/shadow"
import {
  carrying,
  claiming,
  declaring,
  filing,
} from "../../../modules/check-scratch/check-scratch.module.code.ts"
import type { Said } from "./no-rule-in-two-files.code-check.code.ts"
import {
  everySpeltIn,
  noRuleInTwoFiles,
  reasonsIn,
} from "./no-rule-in-two-files.code-check.code.ts"

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

function byRule(held: readonly Held[]): ReadonlyMap<string, readonly Said[]> {
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
  const every = byRule([
    { path: "one.ts", text: CAMEL },
    { path: "two.module.code.ts", text: EXPORTED_AS },
  ])
  const said = reasonsIn("one.ts", CAMEL, every)
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("`camel` says what `exportedAs` in two.module.code.ts says")
})

test("a rule no other file spells is passed over", () => {
  const every = byRule([
    { path: "one.ts", text: WIDEN },
    { path: "two.module.code.ts", text: EXPORTED_AS },
  ])
  expect(reasonsIn("one.ts", WIDEN, every)).toEqual([])
})

test("neither file is the owner, so a rule in two files refuses both", () => {
  const every = byRule([
    { path: "one.ts", text: CAMEL },
    { path: "two.ts", text: EXPORTED_AS },
  ])
  expect(reasonsIn("one.ts", CAMEL, every)).toHaveLength(1)
  expect(reasonsIn("two.ts", EXPORTED_AS, every)).toHaveLength(1)
})

test("a rule standing in more than one other file names one and counts the rest", () => {
  const every = byRule([
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
  expect(reasonsIn("one.ts", both, byRule([{ path: "one.ts", text: both }]))).toEqual([])
})

test("a cast written in two files is passed over, a cast being no rule", () => {
  const one = `function asPage(value: unknown): Page {
  return value as Page
}
`
  const two = `function asHeld(given: unknown): Page {
  return given as Page
}
`
  const every = byRule([
    { path: "one.ts", text: one },
    { path: "two.ts", text: two },
  ])
  expect(reasonsIn("one.ts", one, every)).toEqual([])
  expect(reasonsIn("two.ts", two, every)).toEqual([])
})

test("a body passing its names to one call is passed over however many files write it", () => {
  const one = `function bodyAt(path: string): string {
  return textIn(change, path)
}
`
  const two = `function beside(at: string): string {
  return textIn(change, at)
}
`
  const every = byRule([
    { path: "one.ts", text: one },
    { path: "two.ts", text: two },
  ])
  expect(reasonsIn("one.ts", one, every)).toEqual([])
})

test("a body holding a literal is a rule, so two files writing it are refused", () => {
  const one = `function escapeRegex(str: string): string {
  return str.replace(/[.*+?]/g, "\\\\$&")
}
`
  const two = `function escapeRegExp(said: string): string {
  return said.replace(/[.*+?]/g, "\\\\$&")
}
`
  const every = byRule([
    { path: "one.ts", text: one },
    { path: "two.ts", text: two },
  ])
  expect(reasonsIn("one.ts", one, every)).toHaveLength(1)
})

test("a rule spelled inline is not seen, because only a function is read", () => {
  const inline = `const camel = one.slug.replace(/-([a-z0-9])/g, (_, first: string) => first.toUpperCase())\n`
  const every = byRule([{ path: "two.module.code.ts", text: EXPORTED_AS }])
  expect(reasonsIn("one.ts", inline, every)).toEqual([])
})

const ID = "01a04d86-434f-75ff-8000-00000000000"

const KINDS = ["module", "page-type", "text-property", "file-property"]

const scratch = scratchWorld()

afterAll(scratch.sweep)

function rooted(): string {
  const root = scratch.rootFor("akasha-two-files-")
  for (const one of KINDS) {
    filing(root, "page-type", one, `${ID}${one.length}`)
    carrying(root, one, ["code"])
  }
  declaring(root, "id", { pageTypeSlug: "text-property", unique: "always" })
  declaring(root, "slug", { pageTypeSlug: "text-property", unique: "within-page-type" })
  declaring(root, "code", { pageTypeSlug: "file-property", unique: null })
  claiming(root, "akasha/t/standing.module.ts", "akasha/t/standing.module.ts", `${ID}9`)
  return root
}

const ONE_CODE = "akasha/b/one.module.code.ts"

const TWO_CODE = "akasha/c/two.module.code.ts"

function pageBody(slug: string, last: string): Uint8Array {
  return new TextEncoder().encode(
    `export const it = { id: "${ID}${last}", slug: "${slug}", pageTypeSlug: "module", code: "ts" }\n`
  )
}

function bothArriving(root: string): Change {
  const bodies: Record<string, Uint8Array> = {
    "akasha/b/one.module.ts": pageBody("one", "1"),
    [ONE_CODE]: new TextEncoder().encode(CAMEL),
    "akasha/c/two.module.ts": pageBody("two", "2"),
    [TWO_CODE]: new TextEncoder().encode(EXPORTED_AS),
  }
  return {
    root,
    changed: ["akasha/b/one.module.ts", ONE_CODE, "akasha/c/two.module.ts", TWO_CODE],
    after: (path: string): Uint8Array | null => bodies[path] ?? null,
    before: (): null => null,
  }
}

test("the files a change brings stand among those a rule is looked for in", () => {
  const change = bothArriving(rooted())
  const cast = shadowFor(change)
  if ("refused" in cast) throw new Error(cast.refused)
  const every = everySpeltIn(change, cast.shadow)
  const said = [...every.values()].flat().map((one) => one.path)
  expect(said.sort()).toEqual([ONE_CODE, TWO_CODE])
})

test("two files arriving in one change, both spelling one rule, are both refused", () => {
  const change = bothArriving(rooted())
  const cast = shadowFor(change)
  if ("refused" in cast) throw new Error(cast.refused)
  const said = noRuleInTwoFiles(change, cast.shadow)
  expect(said.map((one) => one.path).sort()).toEqual([ONE_CODE, TWO_CODE])
  expect(said[0]?.reason).toContain("one rule belongs in one file")
})
