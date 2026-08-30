import { expect, test } from "bun:test"
import {
  besideAt,
  heldIn,
  namedIn,
  pageNamed,
  uncommittedAt,
} from "./page-file-name.module.code.ts"

const PAGE_TYPES = new Set<string>(["page-type", "module", "check", "domain"])

const FILE_PROPERTIES = new Set<string>(["code", "test"])

test("a name is read as a stem and the tail before `.ts`", () => {
  expect(namedIn("akasha/one/file-length.check.ts")).toEqual({
    stem: "file-length",
    tail: "check",
  })
})

test("a stem carrying a dot stays the stem, so a property file reads as its page and its key", () => {
  expect(namedIn("akasha/one/file-length.check.code.ts")).toEqual({
    stem: "file-length.check",
    tail: "code",
  })
})

test("a name that is not a `.ts` file answers nothing", () => {
  expect(namedIn("akasha/one/notes.txt")).toBeNull()
})

test("a name with no dot before `.ts` answers nothing", () => {
  expect(namedIn("akasha/one/held.ts")).toBeNull()
})

test("a tail is a page only where the sets handed in say so", () => {
  expect(pageNamed("one.check.ts", PAGE_TYPES)).toBe(true)
  expect(pageNamed("one.folder-shape.ts", PAGE_TYPES)).toBe(false)
  expect(pageNamed("one.folder-shape.ts", new Set(["folder-shape"]))).toBe(true)
})

test("a page file is held as a page, carrying its slug and its page type", () => {
  expect(heldIn("akasha/one/file-length.check.ts", PAGE_TYPES, FILE_PROPERTIES)).toEqual({
    path: "akasha/one/file-length.check.ts",
    kind: "page",
    slug: "file-length",
    pageTypeSlug: "check",
    page: "file-length.check",
    propertySlug: null,
  })
})

test("a property file is held as a property, carrying the page it stands beside", () => {
  expect(heldIn("akasha/one/file-length.check.code.ts", PAGE_TYPES, FILE_PROPERTIES)).toEqual({
    path: "akasha/one/file-length.check.code.ts",
    kind: "property",
    slug: null,
    pageTypeSlug: null,
    page: "file-length.check",
    propertySlug: "code",
  })
})

test("a page and the file standing beside it answer the same page", () => {
  const page = heldIn("a/file-length.check.ts", PAGE_TYPES, FILE_PROPERTIES)
  const beside = heldIn("a/file-length.check.code.ts", PAGE_TYPES, FILE_PROPERTIES)
  expect(beside.page).toBe(page.page as string)
})

test("a tail naming neither a page type nor a file property is a stray", () => {
  const said = heldIn("akasha/one/file-length.check.notes.ts", PAGE_TYPES, FILE_PROPERTIES)
  expect(said.kind).toBe("stray")
  expect(said.page).toBeNull()
})

test("a file that is not `.ts` at all is a stray", () => {
  expect(heldIn("akasha/one/notes.txt", PAGE_TYPES, FILE_PROPERTIES).kind).toBe("stray")
})

test("a property's file stands beside its page, named for the property and what it holds", () => {
  expect(besideAt("akasha/one/file-length.check.ts", "code", "ts")).toBe(
    "akasha/one/file-length.check.code.ts"
  )
})

test("what a property holds names the end, so a property need not be TypeScript", () => {
  expect(besideAt("akasha/one/file-length.check.ts", "note", "md")).toBe(
    "akasha/one/file-length.check.note.md"
  )
})

test("a path that is no TypeScript file is refused rather than answered", () => {
  expect(besideAt("akasha/one/notes.txt", "code", "ts")).toBeNull()
})

test("what besideAt puts together, heldIn takes apart again", () => {
  const page = "akasha/one/file-length.check.ts"
  const beside = besideAt(page, "code", "ts")
  if (beside === null) throw new Error("expected a name beside the page")
  const said = heldIn(beside, PAGE_TYPES, FILE_PROPERTIES)
  expect(said.kind).toBe("property")
  expect(said.propertySlug).toBe("code")
  expect(said.page).toBe("file-length.check")
})

test("a file tailed `uncommitted` is held as its page's uncommitted values, not as a property", () => {
  expect(
    heldIn("akasha/one/file-length.check.uncommitted.ts", PAGE_TYPES, FILE_PROPERTIES)
  ).toEqual({
    path: "akasha/one/file-length.check.uncommitted.ts",
    kind: "uncommitted",
    slug: null,
    pageTypeSlug: null,
    page: "file-length.check",
    propertySlug: null,
  })
})

test("the tail `uncommitted` is reserved, so the sets handed in cannot make it a property or a page", () => {
  const held = heldIn(
    "akasha/one/file-length.check.uncommitted.ts",
    PAGE_TYPES,
    new Set(["code", "uncommitted"])
  )
  expect(held.kind).toBe("uncommitted")
  expect(held.propertySlug).toBeNull()
  expect(pageNamed("akasha/one/held.uncommitted.ts", new Set(["uncommitted"]))).toBe(false)
})

test("an uncommitted file stands beside its page, and heldIn takes that name apart again", () => {
  const page = "akasha/one/file-length.check.ts"
  const beside = uncommittedAt(page)
  expect(beside).toBe("akasha/one/file-length.check.uncommitted.ts")
  if (beside === null) throw new Error("expected a name beside the page")
  expect(heldIn(beside, PAGE_TYPES, FILE_PROPERTIES).page).toBe("file-length.check")
})

test("a path that is no TypeScript file carries no uncommitted file", () => {
  expect(uncommittedAt("akasha/one/notes.txt")).toBeNull()
})
