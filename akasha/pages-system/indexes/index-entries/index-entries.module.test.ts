import { afterAll, expect, test } from "bun:test"
import {
  filePropertiesAt,
  filePropertiesIn,
  loadedFrom,
  pathsOf,
  valueIn,
} from "./index-entries.module.code.ts"
import { A, grounded, scratch } from "./index-entries.module.test-fixtures.ts"

afterAll(scratch.sweep)

test("a body exporting one object is answered with that object", () => {
  expect(valueIn(`export const it = { id: "${A}", slug: "a" } as const\n`)).toEqual({
    id: A,
    slug: "a",
  })
})

test("a body that will not load is answered with why rather than by throwing", () => {
  const loaded = loadedFrom("the new body")
  expect(loaded.value).toBe(null)
  expect(typeof loaded.failed).toBe("string")
})

test("a property no page property declares to be a file is filed under no path", () => {
  const value = { id: A, pageTypeSlug: "domain", slug: "a", definition: "what is held" }

  expect(pathsOf(value, "/repo/a.domain.ts", "/repo", new Set(["code"]))).toEqual(["a.domain.ts"])
})

test("the properties held in a file are the ones the file shape is", () => {
  const values = [
    { id: "1", pageTypeSlug: "file-property", slug: "code" },
    { id: "2", pageTypeSlug: "relation-property", slug: "part-slugs" },
    { id: "3", pageTypeSlug: "domain", slug: "code" },
  ]

  expect([...filePropertiesIn(values)]).toEqual(["code"])
})

test("a property whose name is written in camel is filed under its kebab slug", () => {
  const value = { id: A, pageTypeSlug: "module", slug: "a", codeOf: "ts" }

  expect(pathsOf(value, "/repo/a.module.ts", "/repo", new Set(["code-of"]))).toEqual([
    "a.module.ts",
    "a.module.code-of.ts",
  ])
})

test("the properties held in a file are read from the schema the index carries", () => {
  const { root } = grounded()

  expect([...filePropertiesAt(root)]).toEqual(["code"])
})

test("a body that will not load answers with no value rather than throwing", () => {
  expect(
    valueIn(
      `import { oidOf } from "./reading.module.code.ts"\nexport const it = { id: oidOf("x") }\n`
    )
  ).toBe(null)
  expect(valueIn("the new body")).toBe(null)
})
