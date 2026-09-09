import { expect, test } from "bun:test"
import { NOTHING_OVER, type World } from "../shadow/change-shadow.module.code.ts"
import { kindOf } from "./target-kinding.module.code.ts"

const NAMED = new Set(["page-type", "module", "text-property"])

const UNDER = new Set(["text-property"])

const TYPE = "akasha/kept.page-type.ts"

const PROPERTY = "akasha/properties/kept.text-property.ts"

const PAGE = "akasha/one/kept.module.ts"

const BESIDE = "akasha/one/kept.module.code.ts"

const PLAIN = "akasha/one/notes.md"

const world: World = {
  root: "/nowhere",
  index: Object.assign({} as World["index"], {
    pageTypesIn: () => NAMED,
    kindsUnder: () => UNDER,
  }),
  textOf: () => null,
  bodyOf: () => null,
  under: () => [],
  base: () => null,
  over: NOTHING_OVER,
}

test("a path under a page type name is a page type", () => {
  expect(kindOf(world, TYPE)).toBe("file-page-type")
})

test("a path under a page property name is a page property", () => {
  expect(kindOf(world, PROPERTY)).toBe("file-page-property")
})

test("every other path under a page name is a page", () => {
  expect(kindOf(world, PAGE)).toBe("file-page")
})

test("a path beside a page is code rather than a page", () => {
  expect(kindOf(world, BESIDE)).toBe("file-code")
})

test("a path under no page name and no TypeScript name is a file", () => {
  expect(kindOf(world, PLAIN)).toBe("file")
})
