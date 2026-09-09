import { expect, test } from "bun:test"
import {
  besideAt,
  heldIn,
  pageNamed,
  partedIn,
  partIn,
  secretAt,
  secretNamed,
  uncommittedAt,
  uncommittedBesideAt,
  uncommittedHeld,
  uncommittedNamed,
} from "./page-file-name.module.code.ts"
import {
  agreeing,
  FILE_PROPERTIES,
  itemsAt,
  kindOf,
  MINE,
  PAGE_TYPES,
  PATCH,
  PORTRAIT,
  pageNameIn,
} from "./page-file-name.module.test-fixtures.ts"

test("a page's name is the slug and the page type, whatever sections come after them", () => {
  expect(pageNameIn("one/file-length.check.ts")).toBe("file-length.check")
  expect(pageNameIn("one/file-length.check.code.ts")).toBe("file-length.check")
  expect(pageNameIn("one/sophia.persona.portrait.md")).toBe("sophia.persona")
})

test("what a file holds is read whatever it is, so a property need not be TypeScript", () => {
  expect(partedIn("one/sophia.persona.portrait.md")).toEqual({
    slug: "sophia",
    pageType: "persona",
    sections: ["portrait"],
    held: "md",
  })
})

test("a name of fewer than three dotted parts answers nothing", () => {
  expect(partedIn("one/notes.txt")).toBeNull()
})

test("a name with no dot before `.ts` answers nothing", () => {
  expect(partedIn("one/held.ts")).toBeNull()
})

test("a tail is a page only where the sets handed in say so", () => {
  expect(pageNamed("one.check.ts", PAGE_TYPES)).toBe(true)
  expect(pageNamed("one.folder-shape.ts", PAGE_TYPES)).toBe(false)
  expect(pageNamed("one.folder-shape.ts", new Set(["folder-shape"]))).toBe(true)
})

test("a page file is held as a page, carrying its slug and its page type", () => {
  expect(heldIn("one/file-length.check.ts", PAGE_TYPES, FILE_PROPERTIES)).toEqual({
    path: "one/file-length.check.ts",
    kind: "page",
    slug: "file-length",
    pageTypeSlug: "check",
    page: "file-length.check",
    propertySlug: null,
    part: 1,
    uncommitted: false,
  })
})

test("a property file is held as a property, carrying the page it stands beside", () => {
  expect(heldIn("one/file-length.check.code.ts", PAGE_TYPES, FILE_PROPERTIES)).toEqual({
    path: "one/file-length.check.code.ts",
    kind: "property",
    slug: null,
    pageTypeSlug: null,
    page: "file-length.check",
    propertySlug: "code",
    part: 1,
    uncommitted: false,
  })
})

test("a page and the file standing beside it answer the same page", () => {
  const page = heldIn("a/file-length.check.ts", PAGE_TYPES, FILE_PROPERTIES)
  const beside = heldIn("a/file-length.check.code.ts", PAGE_TYPES, FILE_PROPERTIES)
  expect(beside.page).toBe(page.page as string)
})

test("a tail naming neither a page type nor a file property is a stray", () => {
  const said = heldIn("one/file-length.check.notes.ts", PAGE_TYPES, FILE_PROPERTIES)
  expect(said.kind).toBe("stray")
  expect(said.page).toBeNull()
})

test("a file that is not `.ts` at all is a stray", () => {
  expect(heldIn("one/notes.txt", PAGE_TYPES, FILE_PROPERTIES).kind).toBe("stray")
})

test("a property file that is not TypeScript is held as a property of its page", () => {
  expect(heldIn("one/sophia.persona.portrait.md", PAGE_TYPES, PORTRAIT)).toEqual({
    path: "one/sophia.persona.portrait.md",
    kind: "property",
    slug: null,
    pageTypeSlug: null,
    page: "sophia.persona",
    propertySlug: "portrait",
    part: 1,
    uncommitted: false,
  })
})

test("a page is a TypeScript file, so a page type tail held as anything else is no page", () => {
  expect(pageNamed("one/file-length.check.md", PAGE_TYPES)).toBe(false)
  expect(heldIn("one/file-length.check.md", PAGE_TYPES, FILE_PROPERTIES).kind).toBe("stray")
})

test("a property's file stands beside its page, named for the property and what it holds", () => {
  expect(besideAt("one/file-length.check.ts", "code", "ts")).toBe("one/file-length.check.code.ts")
})

test("what a property holds names the end, so a property need not be TypeScript", () => {
  expect(besideAt("one/file-length.check.ts", "note", "md")).toBe("one/file-length.check.note.md")
})

test("a path that is no TypeScript file is refused rather than answered", () => {
  expect(besideAt("one/notes.txt", "code", "ts")).toBeNull()
})

test("what besideAt puts together, heldIn takes apart again", () => {
  const page = "one/file-length.check.ts"
  const beside = besideAt(page, "code", "ts")
  if (beside === null) throw new Error("expected a name beside the page")
  const said = heldIn(beside, PAGE_TYPES, FILE_PROPERTIES)
  expect(said.kind).toBe("property")
  expect(said.propertySlug).toBe("code")
  expect(said.page).toBe("file-length.check")
})

test("what besideAt puts together in another kind of file, heldIn takes apart too", () => {
  const page = "one/sophia.persona.ts"
  const beside = besideAt(page, "portrait", "md")
  if (beside === null) throw new Error("expected a name beside the page")
  expect(beside).toBe("one/sophia.persona.portrait.md")
  const said = heldIn(beside, PAGE_TYPES, PORTRAIT)
  expect(said.kind).toBe("property")
  expect(said.propertySlug).toBe("portrait")
  expect(said.page).toBe("sophia.persona")
})

test("a file tailed `uncommitted` is held as its page's uncommitted values, not as a property", () => {
  expect(heldIn("one/file-length.check.uncommitted.ts", PAGE_TYPES, FILE_PROPERTIES)).toEqual({
    path: "one/file-length.check.uncommitted.ts",
    kind: "uncommitted",
    slug: null,
    pageTypeSlug: null,
    page: "file-length.check",
    propertySlug: null,
    part: 1,
    uncommitted: true,
  })
})

test("the tail `uncommitted` is reserved, so the sets handed in cannot make it a property or a page", () => {
  const held = heldIn(
    "one/file-length.check.uncommitted.ts",
    PAGE_TYPES,
    new Set(["code", "uncommitted"])
  )
  expect(held.kind).toBe("uncommitted")
  expect(held.propertySlug).toBeNull()
  expect(pageNamed("one/file-length.check.uncommitted.ts", new Set(["uncommitted"]))).toBe(false)
})

test("an uncommitted file stands beside its page, and heldIn takes that name apart again", () => {
  const page = "one/file-length.check.ts"
  const beside = uncommittedAt(page)
  expect(beside).toBe("one/file-length.check.uncommitted.ts")
  if (beside === null) throw new Error("expected a name beside the page")
  expect(heldIn(beside, PAGE_TYPES, FILE_PROPERTIES).page).toBe("file-length.check")
})

test("a path that is no TypeScript file carries no uncommitted file", () => {
  expect(uncommittedAt("one/notes.txt")).toBeNull()
})

test("a name tailed `uncommitted` is answered as one, and a page or property file is not", () => {
  expect(uncommittedNamed("one/file-length.check.uncommitted.ts")).toBe(true)
  expect(uncommittedNamed("one/file-length.check.ts")).toBe(false)
  expect(uncommittedNamed("one/file-length.check.code.ts")).toBe(false)
})

test("a file tailed `sops` is held as its page's secret values, not as a property", () => {
  expect(heldIn("one/aine.claude-account.sops.yaml", PAGE_TYPES, FILE_PROPERTIES)).toEqual({
    path: "one/aine.claude-account.sops.yaml",
    kind: "secret",
    slug: null,
    pageTypeSlug: null,
    page: "aine.claude-account",
    propertySlug: null,
    part: 1,
    uncommitted: false,
  })
})

test("the tail `sops` is reserved, so the sets handed in cannot make it a property or a page", () => {
  const held = heldIn("one/aine.claude-account.sops.yaml", PAGE_TYPES, new Set(["code", "sops"]))
  expect(held.kind).toBe("secret")
  expect(held.propertySlug).toBeNull()
  expect(pageNamed("one/aine.claude-account.sops.ts", new Set(["sops"]))).toBe(false)
})

test("a sops file stands beside its page, and heldIn takes that name apart again", () => {
  const page = "one/aine.claude-account.ts"
  const beside = secretAt(page)
  expect(beside).toBe("one/aine.claude-account.sops.yaml")
  if (beside === null) throw new Error("expected a name beside the page")
  expect(heldIn(beside, PAGE_TYPES, FILE_PROPERTIES).page).toBe("aine.claude-account")
})

test("a path that is no TypeScript file carries no sops file", () => {
  expect(secretAt("one/notes.txt")).toBeNull()
})

test("a name tailed `sops` is answered as one, and a page or property or uncommitted file is not", () => {
  expect(secretNamed("one/aine.claude-account.sops.yaml")).toBe(true)
  expect(secretNamed("one/aine.claude-account.ts")).toBe(false)
  expect(secretNamed("one/file-length.check.code.ts")).toBe(false)
  expect(secretNamed("one/file-length.check.uncommitted.ts")).toBe(false)
})

test("a name is read from its slug, and what follows the page type is a list of sections", () => {
  expect(partedIn("one/file-length.check.ts")).toEqual({
    slug: "file-length",
    pageType: "check",
    sections: [],
    held: "ts",
  })
  expect(partedIn("one/file-length.check.code.ts")).toEqual({
    slug: "file-length",
    pageType: "check",
    sections: ["code"],
    held: "ts",
  })
})

test("a name carrying two sections carries both of them, in the order they are written", () => {
  expect(partedIn("one/file-length.check.lines.uncommitted.jsonl")).toEqual({
    slug: "file-length",
    pageType: "check",
    sections: ["lines", "uncommitted"],
    held: "jsonl",
  })
})

test("a name carrying three sections carries all three, so how many there are is free", () => {
  expect(partedIn("one/dalla.seat.uncommitted.ts.a1b2.part")).toEqual({
    slug: "dalla",
    pageType: "seat",
    sections: ["uncommitted", "ts", "a1b2"],
    held: "part",
  })
})

test("a slug carrying hyphens and digits still anchors the name at its first part", () => {
  expect(partedIn("one/page-file-name.module.code.ts")).toEqual({
    slug: "page-file-name",
    pageType: "module",
    sections: ["code"],
    held: "ts",
  })
  expect(partedIn("one/temper-0000000000000fff.runtime-error.uncommitted.ts")).toEqual({
    slug: "temper-0000000000000fff",
    pageType: "runtime-error",
    sections: ["uncommitted"],
    held: "ts",
  })
})

test("a part written in anything but lower kebab case answers nothing", () => {
  expect(partedIn("one/File-Length.check.ts")).toBeNull()
  expect(partedIn("one/file_length.check.ts")).toBeNull()
  expect(partedIn("one/file-length.check.CODE.ts")).toBeNull()
})

test("a name carrying sections nothing here knows is held as a stray", () => {
  expect(kindOf("one/dalla.seat.uncommitted.ts.a1b2.part")).toBe("stray")
  expect(kindOf("one/file-length.check.lines.uncommitted.jsonl")).toBe("stray")
})

test("a page type nothing knows still holds a property, an uncommitted file and a sops file", () => {
  expect(kindOf("one/dalla.seat.code.ts")).toBe("property")
  expect(kindOf("one/dalla.seat.uncommitted.ts")).toBe("uncommitted")
  expect(kindOf("one/dalla.seat.sops.yaml")).toBe("secret")
  expect(kindOf("one/dalla.seat.ts")).toBe("stray")
})

test("what heldIn answers of a name is what each predicate answers of that name", () => {
  agreeing("one/file-length.check.ts")
  agreeing("one/file-length.check.uncommitted.ts")
  agreeing("one/aine.claude-account.sops.yaml")
  agreeing("one/file-length.check.code.ts")
  agreeing("one/dalla.seat.patch.uncommitted.patch")
  agreeing("one/held.uncommitted.ts")
  agreeing("one/held.uncommitted.ts", new Set(["uncommitted"]))
  agreeing("one/held.sops.yaml")
  agreeing("one/notes.txt")
  agreeing("one/dalla.seat.patch.uncommitted.patch", PAGE_TYPES, PATCH)
  agreeing("one/dalla.seat.patch.sops.yaml", PAGE_TYPES, PATCH)
})

test("a reserved word in the page type slot names a page type rather than a file beside a page", () => {
  expect(uncommittedNamed("one/held.uncommitted.ts")).toBe(false)
  expect(secretNamed("one/held.sops.yaml")).toBe(false)
})

test("a values sidecar carries the one section, so a second section is no values sidecar", () => {
  expect(uncommittedNamed("one/dalla.seat.uncommitted.ts")).toBe(true)
  expect(secretNamed("one/dalla.seat.sops.yaml")).toBe(true)
  expect(uncommittedNamed("one/dalla.seat.patch.uncommitted.patch")).toBe(false)
  expect(secretNamed("one/dalla.seat.patch.sops.yaml")).toBe(false)
})

test("a file is outside the commit as a values sidecar or as a property sectioned that way", () => {
  expect(uncommittedHeld("one/dalla.seat.uncommitted.ts")).toBe(true)
  expect(uncommittedHeld("one/dalla.seat.patch.uncommitted.patch")).toBe(true)
  expect(uncommittedHeld("one/file-length.check.ts")).toBe(false)
  expect(uncommittedHeld("one/file-length.check.code.ts")).toBe(false)
  expect(uncommittedHeld("one/held.uncommitted.ts")).toBe(false)
  expect(uncommittedHeld("one/notes.txt")).toBe(false)
})

test("a file property is held uncommitted under its own slug and then `uncommitted`", () => {
  const path = "one/dalla.seat.patch.uncommitted.patch"
  expect(heldIn(path, PAGE_TYPES, PATCH)).toEqual({
    path,
    kind: "property",
    slug: null,
    pageTypeSlug: null,
    page: "dalla.seat",
    propertySlug: "patch",
    part: 1,
    uncommitted: true,
  })
  expect(kindOf(path)).toBe("stray")
  expect(heldIn("one/dalla.seat.notes.uncommitted.md", PAGE_TYPES, PATCH).kind).toBe("stray")
})

test("what uncommittedBesideAt puts together, heldIn takes apart again", () => {
  const beside = uncommittedBesideAt("one/dalla.seat.ts", "patch", "patch")
  expect(beside).toBe("one/dalla.seat.patch.uncommitted.patch")
  if (beside === null) throw new Error("expected a name beside the page")
  expect(heldIn(beside, PAGE_TYPES, PATCH).propertySlug).toBe("patch")
  expect(uncommittedBesideAt("one/notes.txt", "patch", "patch")).toBeNull()
})

test("a property held uncommitted is no values sidecar, however the sets read its slug", () => {
  const path = "one/dalla.seat.patch.uncommitted.patch"
  expect(heldIn(path, PAGE_TYPES, PATCH).kind).toBe("property")
  expect(uncommittedNamed(path)).toBe(false)
})

test("a property's file past the first carries a part, and heldIn reads it back", () => {
  const held = itemsAt(`${MINE}.items.part2.jsonl`)
  expect(held.kind).toBe("property")
  expect(held.propertySlug).toBe("items")
  expect(held.part).toBe(2)
  expect(itemsAt(`${MINE}.items.jsonl`).part).toBe(1)
})

test("a part number below two is never written, and a part needs a property before it", () => {
  expect(partIn("part2")).toBe(2)
  expect(partIn("part1")).toBeNull()
  expect(partIn("part02")).toBeNull()
  expect(itemsAt(`${MINE}.items.part1.jsonl`).kind).toBe("stray")
  expect(itemsAt(`${MINE}.part2.jsonl`).propertySlug).toBe("part2")
})

const AUDITED = new Set(["code", "audit.code"])

test("two sections name a property only where the set handed in has them joined by a dot", () => {
  const path = "one/file-length.check.audit.code.ts"
  expect(heldIn(path, PAGE_TYPES, AUDITED).propertySlug).toBe("audit.code")
  expect(kindOf(path)).toBe("stray")
})

test("what besideAt puts together for a group member, heldIn takes apart again", () => {
  const beside = besideAt("one/file-length.check.ts", "audit.code", "ts")
  expect(beside).toBe("one/file-length.check.audit.code.ts")
})
