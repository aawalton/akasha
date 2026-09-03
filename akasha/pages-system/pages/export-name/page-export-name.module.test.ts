import { expect, test } from "bun:test"
import { readFileSync } from "node:fs"
import { exportedAs, nameFaultIn, typedAs } from "./page-export-name.module.code.ts"

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

test("the type a page type declares is that name with its first character raised", () => {
  expect(typedAs("page-type")).toBe("PageType")
  expect(typedAs("check")).toBe("Check")
})

test("a type name is raised once, so the hyphens inside it are answered the same way", () => {
  expect(typedAs("named-file-property")).toBe("NamedFileProperty")
})

test("an empty slug names no type rather than refusing", () => {
  expect(typedAs("")).toBe("")
})

test("this module imports nothing, so everything that names a page's export can reach it", () => {
  expect(readFileSync(CODE, "utf8")).not.toMatch(/^\s*import\s/m)
})

test("a slug whose name is an identifier is at fault for nothing", () => {
  expect(nameFaultIn("page-export-name")).toBeNull()
  expect(nameFaultIn("landing")).toBeNull()
  expect(nameFaultIn("id-is-a-uuid-version-7")).toBeNull()
})

test("a slug opening with a digit names no export, because no identifier opens with one", () => {
  expect(nameFaultIn("1066-the-year-that-changed-everything")).toContain(
    "1066TheYearThatChangedEverything"
  )
  expect(nameFaultIn("7-days-of-drawing")).not.toBeNull()
})

test("the page type slug in front of the digit is what makes such a slug name an export", () => {
  expect(nameFaultIn("great-course-7-days-of-drawing")).toBeNull()
  expect(nameFaultIn("wake-day-2026-08-20")).toBeNull()
})

test("a slug whose name TypeScript keeps for itself names no export", () => {
  expect(nameFaultIn("class")).not.toBeNull()
  expect(nameFaultIn("switch")).not.toBeNull()
  expect(nameFaultIn("package")).not.toBeNull()
  expect(nameFaultIn("static")).not.toBeNull()
  expect(nameFaultIn("yield")).not.toBeNull()
})

test("a word reserved only where a class body stands is kept too, since a page is a module", () => {
  expect(nameFaultIn("private")).not.toBeNull()
  expect(nameFaultIn("interface")).not.toBeNull()
})

test("a word that only reads as a keyword names an export, so nothing is refused for looking like one", () => {
  expect(nameFaultIn("type")).toBeNull()
  expect(nameFaultIn("as")).toBeNull()
  expect(nameFaultIn("undefined")).toBeNull()
})

test("a hyphen no lowercase letter or digit follows is left standing, and no name holds one", () => {
  expect(nameFaultIn("page-")).not.toBeNull()
  expect(nameFaultIn("two--hyphens")).not.toBeNull()
})

test("a slug saying nothing names no export rather than an empty one", () => {
  expect(nameFaultIn("")).not.toBeNull()
})

test("a letter outside ascii opens an identifier, so a slug carrying one is no fault", () => {
  expect(nameFaultIn("cafe-au-lait")).toBeNull()
  expect(nameFaultIn("über-alles")).toBeNull()
})

test("what is at fault is said as the name the slug makes rather than as the slug", () => {
  expect(nameFaultIn("1066-the-year")).toContain("1066TheYear")
})
