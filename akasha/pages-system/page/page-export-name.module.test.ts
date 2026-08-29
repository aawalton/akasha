import { expect, test } from "bun:test"
import { readFileSync } from "node:fs"
import { exportedAs } from "./page-export-name.module.code.ts"

const CODE = `${import.meta.dir}/page-export-name.module.code.ts`

test("a hyphen is dropped and the character following it is raised", () => {
  expect(exportedAs("page-address")).toBe("pageAddress")
})

test("a slug carrying no hyphen is its own name", () => {
  expect(exportedAs("landing")).toBe("landing")
})

test("every hyphen is answered, not only the first", () => {
  expect(exportedAs("domain-is-named-by-a-parent")).toBe("domainIsNamedByAParent")
})

test("a digit is raised to itself, so only the hyphen before it is dropped", () => {
  expect(exportedAs("id-is-a-uuid-version-7")).toBe("idIsAUuidVersion7")
})

test("the first character is never raised, so a name is one a page is exported under", () => {
  expect(exportedAs("page-export-name")).toBe("pageExportName")
})

test("a trailing hyphen stands, because no character follows it to raise", () => {
  expect(exportedAs("page-")).toBe("page-")
})

test("an empty slug is an empty name rather than a refusal", () => {
  expect(exportedAs("")).toBe("")
})

test("this module imports nothing, so everything that names a page's export can reach it", () => {
  expect(readFileSync(CODE, "utf8")).not.toMatch(/^\s*import\s/m)
})
