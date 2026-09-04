import { afterAll, expect, test } from "bun:test"
import { listedFiled } from "@akasha/indexes/testing"
import { valueAt } from "@akasha/pages-system/page-value"
import { rebuilt, repoWith, scratch } from "../move.command.test-fixtures.ts"
import { parentingOver, parentingSaid } from "./move-parenting.module.code.ts"

afterAll(scratch.sweep)

const AT = "akasha/one/one.workspace-package.ts"

const HELD = "akasha/one/held/held.module.ts"

const THERE = "akasha/two/held/held.module.ts"

const RENAMED = "akasha/one/uno.workspace-package.ts"

const NOWHERE = "akasha/nowhere/held/held.module.ts"

const NOWHERE_FOLDER = "akasha/nowhere/held"

const CROSSED = "akasha/nowhere/held, akasha/nowhere, akasha"

const STRAY = "akasha/one/stray/stray.module.ts"

const STRAY_AT = "akasha/two/stray/stray.module.ts"

const STRAY_NOWHERE = "akasha/nowhere/stray/stray.module.ts"

const ORPHAN = "akasha/nowhere/orphan/orphan.module.ts"

const ORPHAN_AT = "akasha/two/orphan/orphan.module.ts"

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
      [STRAY]: paged("stray", "module"),
      [ORPHAN]: paged("orphan", "module"),
      "akasha/two/two.workspace-package.ts": paged("two", "workspace-package", {
        partSlugs: ["module/other", "module/stray"],
      }),
      "akasha/two/other/other.module.ts": paged("other", "module"),
    })
  )
}

function parenting(root: string, from: string, to: string): ReturnType<typeof parentingOver> {
  return parentingOver(root, [{ from, to }], new Map([[from, to]]), (path) => valueAt(path, root))
}

function parentingAll(
  root: string,
  pairs: readonly { readonly from: string; readonly to: string }[]
): ReturnType<typeof parentingOver> {
  const moved = new Map(pairs.map((one) => [one.from, one.to]))
  return parentingOver(root, pairs, moved, (path) => valueAt(path, root))
}

function refusedIn(said: ReturnType<typeof parentingOver>): string {
  return "refusals" in said ? said.refusals.join("\n") : ""
}

function partedIn(said: ReturnType<typeof parentingOver>): readonly (readonly string[])[] {
  if ("refusals" in said) return []
  return said.parentings.map((one) => [one.address, one.leaving.at, one.joining.at])
}

function keptIn(said: ReturnType<typeof parentingOver>): readonly (readonly string[])[] {
  if ("refusals" in said) return []
  return said.keepings.map((one) => [one.address, one.folder])
}

function toldIn(said: ReturnType<typeof parentingOver>): string {
  return "refusals" in said ? "" : parentingSaid(said, true).join("\n")
}

test("a page carried between packages leaves the parts of one and joins the parts of the other", () => {
  const said = parenting(world(), HELD, THERE)
  expect(refusedIn(said)).toBe("")
  expect(partedIn(said)).toEqual([["module/held", AT, "akasha/two/two.workspace-package.ts"]])
})

test("a page arriving where no page holds the folder keeps the parent it has", () => {
  const said = parenting(world(), HELD, NOWHERE)
  expect(refusedIn(said)).toBe("")
  expect(partedIn(said)).toEqual([])
  expect(keptIn(said)).toEqual([["module/held", NOWHERE_FOLDER]])
})

test("a page left under the parent it has is named in the answer with why", () => {
  const told = toldIn(parenting(world(), HELD, NOWHERE))
  expect(told).toContain("`module/held` would keep the parent it has")
  expect(told).toContain(CROSSED)
  expect(told).toContain(`no page holds \`${NOWHERE_FOLDER}\``)
})

test("a page left under the parent it has is asked nothing of the page holding where it was", () => {
  const said = parenting(world(), STRAY, STRAY_NOWHERE)
  expect(refusedIn(said)).toBe("")
  expect(keptIn(said)).toEqual([["module/stray", "akasha/nowhere/stray"]])
})

test("a page carried out of a folder no page holds is refused rather than carried", () => {
  const said = parenting(world(), ORPHAN, ORPHAN_AT)
  expect(refusedIn(said)).toContain("was in a folder no page holds")
})

test("a page losing a part while it is itself carried is named where it arrives", () => {
  const root = world()
  const said = parentingAll(root, [
    { from: HELD, to: THERE },
    { from: AT, to: RENAMED },
  ])
  expect(partedIn(said)).toEqual([["module/held", RENAMED, "akasha/two/two.workspace-package.ts"]])
})

test("a page carried within the one folder changes no parts", () => {
  const said = parenting(world(), HELD, "akasha/one/held/renamed.module.ts")
  expect(refusedIn(said)).toBe("")
  expect(partedIn(said)).toEqual([])
})

test("a page the holder of where it arrives already names changes no parts", () => {
  const said = parenting(world(), STRAY, STRAY_AT)
  expect(refusedIn(said)).toBe("")
  expect(partedIn(said)).toEqual([])
})

test("a file that is no page's own file changes no parts", () => {
  const root = world()
  const from = "akasha/one/held/held.module.code.ts"
  expect(partedIn(parenting(root, from, "akasha/two/held/held.module.code.ts"))).toEqual([])
})
