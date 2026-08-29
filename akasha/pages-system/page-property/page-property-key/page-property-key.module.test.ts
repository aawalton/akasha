import { expect, test } from "bun:test"
import { readFileSync } from "node:fs"
import { exportedAs } from "../../page/page-export-name.module.code.ts"
import { slugFor } from "./page-property-key.module.code.ts"

const CODE = `${import.meta.dir}/page-property-key.module.code.ts`

const KEYS = ["pageTypeSlug", "slug", "extendsSlug", "partSlugs", "runsOnAudit", "id"]

test("a capital is lowered and a hyphen is set before it", () => {
  expect(slugFor("extendsSlug")).toBe("extends-slug")
})

test("every capital is answered, not only the first", () => {
  expect(slugFor("pageTypeSlug")).toBe("page-type-slug")
})

test("a key carrying no capital is its own slug", () => {
  expect(slugFor("slug")).toBe("slug")
})

test("a digit is no capital, so a key ending in one is left whole", () => {
  expect(slugFor("version7")).toBe("version7")
})

test("a leading capital sets a leading hyphen, because a key is written in camel", () => {
  expect(slugFor("Slug")).toBe("-slug")
})

test("an empty key is an empty slug rather than a refusal", () => {
  expect(slugFor("")).toBe("")
})

test("a key written in camel survives the trip out to its slug and back", () => {
  for (const key of KEYS) expect(exportedAs(slugFor(key))).toBe(key)
})

test("this module imports nothing, so everything that files a property can reach it", () => {
  expect(readFileSync(CODE, "utf8")).not.toMatch(/^\s*import\s/m)
})
