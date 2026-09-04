import { afterAll, expect, test } from "bun:test"
import { listedFiled } from "@akasha/indexes/testing"
import { valueAt } from "@akasha/pages-system/page-value"
import { rebuilt, repoWith, scratch } from "../move.command.test-fixtures.ts"
import { parentingOver, withoutPart, withPart } from "./move-parenting.module.code.ts"

afterAll(scratch.sweep)

const AT = "akasha/one/one.workspace-package.ts"

const LIST = `export const one = {
  id: "01a04bed-1450-7000-8000-0000000000a1",
  pageTypeSlug: "workspace-package",
  slug: "one",
  partSlugs: [
    "module/alpha",
    "module/gamma",
  ],
}
`

const HELD = "akasha/one/held/held.module.ts"

const THERE = "akasha/two/held/held.module.ts"

const NOWHERE = "akasha/nowhere/held/held.module.ts"

function idFor(slug: string): string {
  const held = [...slug].reduce((sum, one) => (sum * 31 + one.charCodeAt(0)) % 0xffffffff, 7)
  return `01a04bed-1450-7000-8000-${held.toString(16).padStart(12, "0")}`
}

function paged(slug: string, pageTypeSlug: string, more: Record<string, unknown> = {}): string {
  const value = { id: idFor(slug), pageTypeSlug, slug, definition: `the ${slug} page`, ...more }
  return `export const it = ${JSON.stringify(value, null, 2)} as const\n`
}

const TYPES = ["domain", "module", "workspace-package"]

function world(): string {
  const root = built()
  for (const slug of TYPES) {
    const path = `akasha/${slug}.page-type.ts`
    listedFiled(root, "page-type", slug, [{ path, id: idFor(slug) }])
  }
  return root
}

function built(): string {
  return rebuilt(
    repoWith({
      "akasha/domain.page-type.ts": paged("domain", "page-type", {
        pluralSlug: "domains",
        extendsSlug: null,
      }),
      "akasha/module.page-type.ts": paged("module", "page-type", {
        pluralSlug: "modules",
        extendsSlug: "page-type/domain",
      }),
      "akasha/workspace-package.page-type.ts": paged("workspace-package", "page-type", {
        pluralSlug: "workspace-packages",
        extendsSlug: "page-type/domain",
      }),
      [AT]: paged("one", "workspace-package", { partSlugs: ["module/held"] }),
      [HELD]: paged("held", "module"),
      "akasha/two/two.workspace-package.ts": paged("two", "workspace-package", {
        partSlugs: ["module/other"],
      }),
      "akasha/two/other/other.module.ts": paged("other", "module"),
    })
  )
}

function parenting(root: string, from: string, to: string): ReturnType<typeof parentingOver> {
  return parentingOver(root, [{ from, to }], new Map([[from, to]]), (path) => valueAt(path, root))
}

function refusedIn(said: ReturnType<typeof parentingOver>): string {
  return "refusals" in said ? said.refusals.join("\n") : ""
}

function partedIn(said: ReturnType<typeof parentingOver>): readonly (readonly string[])[] {
  if ("refusals" in said) return []
  return said.parentings.map((one) => [one.address, one.leaving.at, one.joining.at])
}

test("a part is added where its spelling sorts, on a line of its own", () => {
  expect(withPart(AT, LIST, "module/beta")).toContain('"module/alpha",\n    "module/beta",\n')
})

test("a part sorting past every one named is added after the last", () => {
  expect(withPart(AT, LIST, "module/zeta")).toContain('"module/gamma",\n    "module/zeta",\n')
})

test("a part already named is left where it is rather than named twice", () => {
  expect(withPart(AT, LIST, "module/alpha")).toBe(LIST)
})

test("a part taken out takes its whole line with it", () => {
  expect(withoutPart(AT, LIST, ["module/alpha"])).toContain('partSlugs: [\n    "module/gamma",')
})

test("a part no list names is answered as nothing rather than as an unchanged list", () => {
  expect(withoutPart(AT, LIST, ["module/nothing"])).toBe(null)
})

test("a page carried between packages leaves the parts of one and joins the parts of the other", () => {
  const said = parenting(world(), HELD, THERE)
  expect(refusedIn(said)).toBe("")
  expect(partedIn(said)).toEqual([["module/held", AT, "akasha/two/two.workspace-package.ts"]])
})

test("a page arriving where no page holds the folder is refused rather than left unnamed", () => {
  expect(refusedIn(parenting(world(), HELD, NOWHERE))).toContain("akasha/nowhere/held")
})

test("a page carried within the one folder changes no parts", () => {
  const said = parenting(world(), HELD, "akasha/one/held/renamed.module.ts")
  expect(refusedIn(said)).toBe("")
  expect(partedIn(said)).toEqual([])
})

test("a file that is no page's own file changes no parts", () => {
  const root = world()
  const from = "akasha/one/held/held.module.code.ts"
  expect(partedIn(parenting(root, from, "akasha/two/held/held.module.code.ts"))).toEqual([])
})
