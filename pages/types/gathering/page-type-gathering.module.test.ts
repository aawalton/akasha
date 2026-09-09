import { afterAll, expect, test } from "bun:test"
import { bodyOf, idOf, indexedRepo, scratch } from "@akasha/indexes/indexing/testing"
import { typeSlugsIn, typesAmong, typeValuesIn } from "./page-type-gathering.module.code.ts"

afterAll(scratch.sweep)

const KIND_TYPE = "akasha/held-kind.page-type.ts"

const ONE_KIND = "akasha/held-kinds/one.held-kind.ts"

function repoIn(): string {
  return indexedRepo({
    [KIND_TYPE]: bodyOf({
      id: idOf("e"),
      pageTypeSlug: "page-type",
      slug: "held-kind",
      pluralSlug: "held-kinds",
      extends: ["page-type/page-type"],
    }),
    [ONE_KIND]: bodyOf({
      id: idOf("f"),
      pageTypeSlug: "held-kind",
      slug: "one",
      pluralSlug: "ones",
      extends: ["page-type/module"],
    }),
  })
}

test("a type reaching `page-type` by extending stands among the types gathered", () => {
  expect([...typeSlugsIn(repoIn())]).toContain("held-kind")
})

test("a type reaching no such type stands outside the types gathered", () => {
  expect([...typeSlugsIn(repoIn())]).not.toContain("module")
})

test("the pages of a type that was gathered are read as page types", () => {
  const root = repoIn()
  const held = typeValuesIn(root, typeSlugsIn(root)).map((one) => one[`slug`])

  expect(held).toContain("one")
})

test("a value stands as a page type where the type it is was named", () => {
  const value = { id: "a", pageTypeSlug: "held-kind", slug: "one" }

  expect([...typesAmong([value], new Set(["held-kind"])).keys()]).toEqual(["one"])
})

test("a caller naming no types reads `page-type` alone", () => {
  const value = { id: "a", pageTypeSlug: "held-kind", slug: "one" }

  expect([...typesAmong([value]).keys()]).toEqual([])
})
