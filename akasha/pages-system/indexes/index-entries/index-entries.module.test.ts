import { afterAll, expect, test } from "bun:test"
import { mkdirSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import {
  filePropertiesAt,
  filePropertiesIn,
  loadedFrom,
  pathsOf,
  schemaAt,
  uniquePropertiesAt,
  valueAt,
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

function declaring(index: string, slug: string, said: Record<string, unknown>): void {
  const at = join(index, "schema", "page-property", "slug", `${slug}.jsonl`)
  mkdirSync(dirname(at), { recursive: true })
  writeFileSync(at, `${JSON.stringify(said)}\n`, "utf8")
}

test("a schema line saying nothing about unique declares no identifier", () => {
  const index = scratch.rootFor("akasha-entries-schema-")
  declaring(index, "held", { pageTypeSlug: "text-property", targetPageTypeSlug: null })

  expect(schemaAt(index).get("held")?.unique).toBe(null)
  expect([...uniquePropertiesAt(index).keys()]).toEqual([])
})

test("a schema line saying nothing about its target names no target", () => {
  const index = scratch.rootFor("akasha-entries-target-")
  declaring(index, "held", { pageTypeSlug: "relation-property" })

  expect(schemaAt(index).get("held")?.targetPageTypeSlug).toBe(null)
})

test("a schema line that does say unique declares it still", () => {
  const index = scratch.rootFor("akasha-entries-unique-")
  declaring(index, "id", {
    pageTypeSlug: "text-property",
    targetPageTypeSlug: null,
    unique: "always",
  })

  expect([...uniquePropertiesAt(index).entries()]).toEqual([["id", "always"]])
})

test("a path standing as a folder holds no page, and is not read as though it were a file", () => {
  const repo = scratch.rootFor("akasha-entries-folder-")
  mkdirSync(join(repo, "held"), { recursive: true })

  expect(valueAt("held", repo)).toBe(null)
})

test("a path standing as nothing holds no page", () => {
  const repo = scratch.rootFor("akasha-entries-gone-")

  expect(valueAt("gone.module.ts", repo)).toBe(null)
})

test("a path standing as a file is read for the page it holds", () => {
  const repo = scratch.rootFor("akasha-entries-file-")
  writeFileSync(join(repo, "held.module.ts"), 'export const held = { slug: "held" }\n', "utf8")

  expect(valueAt("held.module.ts", repo)?.["slug"]).toBe("held")
})
