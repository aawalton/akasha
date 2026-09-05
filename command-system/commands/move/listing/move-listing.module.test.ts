import { expect, test } from "bun:test"
import { withoutPart, withPart } from "./move-listing.module.code.ts"

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

const BARE = 'export const one = { slug: "one" }\n'

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

test("a body naming no `partSlugs` is answered as nothing", () => {
  expect(withPart(AT, BARE, "module/beta")).toBe(null)
  expect(withoutPart(AT, BARE, ["module/alpha"])).toBe(null)
})
