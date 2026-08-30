import { afterAll, expect, test } from "bun:test"
import { speltIn } from "../../../code-system/code-rule/code-rule.module.code.ts"
import { scratchWorld } from "../../../command-system/scratching/scratching.module.code.ts"
import { declaring, stands } from "../../check-scratch/check-scratch.module.code.ts"
import type { Leaving } from "../../judging/judging.module.code.ts"
import type { Owner } from "./no-second-spelling.check.code.ts"
import { noSecondSpelling, ownedIn, reasonsIn } from "./no-second-spelling.check.code.ts"

const EXPORTED_AS = `export function exportedAs(slug: string): string {
  return slug.replace(/-([a-z0-9])/g, (_, one: string) => one.toUpperCase())
}
`

const CAMEL = `function camel(slug: string): string {
  return slug.replace(/-([a-z0-9])/g, (_, first: string) => first.toUpperCase())
}
`

function owning(text: string, name: string, path: string): ReadonlyMap<string, Owner> {
  const found = speltIn(path, text).find((each) => each.name === name)
  if (found === undefined) throw new Error(`no \`${name}\` was read out of the text`)
  return new Map<string, Owner>([[found.rule, { path, name }]])
}

test("a second spelling of what a module owns is refused, and names where to reach", () => {
  const owned = owning(
    EXPORTED_AS,
    "exportedAs",
    "pages-system/page/page-export-name.module.code.ts"
  )
  const said = reasonsIn("checks-system/checking.module.code.ts", CAMEL, owned)
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("`camel` spells again what `exportedAs`")
  expect(said[0]).toContain("page-export-name.module.code.ts")
})

test("the module that owns a rule may spell it, because it is the one place it is held", () => {
  const at = "pages-system/page/page-export-name.module.code.ts"
  expect(reasonsIn(at, EXPORTED_AS, owning(EXPORTED_AS, "exportedAs", at))).toEqual([])
})

test("a function saying something no module owns is passed over", () => {
  const other = `function widen(one: string): string {
  return one.padEnd(80, " ")
}
`
  expect(reasonsIn("one.ts", other, owning(EXPORTED_AS, "exportedAs", "two.ts"))).toEqual([])
})

test("a rule spelled inline is not seen, so this ratchets and proves no absence", () => {
  const inline = `const camel = one.slug.replace(/-([a-z0-9])/g, (_, first: string) => first.toUpperCase())\n`
  expect(reasonsIn("one.ts", inline, owning(EXPORTED_AS, "exportedAs", "two.ts"))).toEqual([])
})

const ID = "01a04d86-434f-75ff-8000-000000000001"

const KINDS = ["module", "page-type", "text-property", "file-property"]

const EXPORTED_AGAIN = `export function camel(slug: string): string {
  return slug.replace(/-([a-z0-9])/g, (_, first: string) => first.toUpperCase())
}
`

const scratch = scratchWorld()

afterAll(scratch.sweep)

function rooted(): string {
  const root = scratch.rootFor("akasha-second-spelling-")
  for (const one of KINDS) {
    stands(root, "page-type", one, `${ID.slice(0, -1)}${one.length}`)
  }
  declaring(root, "id", { pageTypeSlug: "text-property", unique: "always" })
  declaring(root, "slug", { pageTypeSlug: "text-property", unique: "within-page-type" })
  declaring(root, "code", { pageTypeSlug: "file-property", unique: null })
  return root
}

const PAGE = "akasha/b/new.module.ts"

const OWNER = "akasha/b/new.module.code.ts"

const OTHER = "akasha/c/other.ts"

function bothArriving(root: string): Leaving {
  const bodies: Record<string, Uint8Array> = {
    [PAGE]: new TextEncoder().encode(
      `export const it = { id: "${ID}", slug: "new", pageTypeSlug: "module", code: "ts" }\n`
    ),
    [OWNER]: new TextEncoder().encode(EXPORTED_AS),
    [OTHER]: new TextEncoder().encode(EXPORTED_AGAIN),
  }
  return {
    root,
    changed: [PAGE, OWNER, OTHER],
    at: (path: string): Uint8Array | null => bodies[path] ?? null,
    was: (): null => null,
  }
}

test("a module page arriving in the change owns what its code file spells, as the index will say", () => {
  const owned = ownedIn(bothArriving(rooted()))
  expect([...owned.values()].map((one) => one.path)).toEqual([OWNER])
})

test("two files arriving in one change, the second spelling what the first owns, are refused", () => {
  const said = noSecondSpelling(bothArriving(rooted()))
  expect(said.map((one) => one.path)).toEqual([OTHER])
  expect(said[0]?.reason).toContain("`camel` spells again what `exportedAs`")
})
