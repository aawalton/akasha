import { expect, test } from "bun:test"
import {
  besideAt,
  heldIn,
  pageNamed,
  pageOf,
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
  FILE_PROPERTIES,
  itemsAt,
  kindOf,
  MINE,
  PAGE_TYPES,
  PATCH,
  PORTRAIT,
} from "./page-file-name.module.test-fixtures.ts"

function pageNameIn(path: string): string {
  const said = partedIn(path)
  if (said === null) throw new Error(`expected \`${path}\` to parse`)
  return pageOf(said)
}

test("a page's name is the slug and the page type, whatever sections come after them", () => {
  expect(pageNameIn("akasha/one/file-length.check.ts")).toBe("file-length.check")
  expect(pageNameIn("akasha/one/file-length.check.code.ts")).toBe("file-length.check")
  expect(pageNameIn("akasha/one/sophia.persona.portrait.md")).toBe("sophia.persona")
})

test("what a file holds is read whatever it is, so a property need not be TypeScript", () => {
  expect(partedIn("akasha/one/sophia.persona.portrait.md")).toEqual({
    slug: "sophia",
    pageType: "persona",
    sections: ["portrait"],
    held: "md",
  })
})

test("a name of fewer than three dotted parts answers nothing", () => {
  expect(partedIn("akasha/one/notes.txt")).toBeNull()
})

test("a name with no dot before `.ts` answers nothing", () => {
  expect(partedIn("akasha/one/held.ts")).toBeNull()
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
    part: 1,
    uncommitted: false,
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
  const said = heldIn("akasha/one/file-length.check.notes.ts", PAGE_TYPES, FILE_PROPERTIES)
  expect(said.kind).toBe("stray")
  expect(said.page).toBeNull()
})

test("a file that is not `.ts` at all is a stray", () => {
  expect(heldIn("akasha/one/notes.txt", PAGE_TYPES, FILE_PROPERTIES).kind).toBe("stray")
})

test("a property file that is not TypeScript is held as a property of its page", () => {
  expect(heldIn("akasha/one/sophia.persona.portrait.md", PAGE_TYPES, PORTRAIT)).toEqual({
    path: "akasha/one/sophia.persona.portrait.md",
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
  expect(pageNamed("akasha/one/file-length.check.md", PAGE_TYPES)).toBe(false)
  expect(heldIn("akasha/one/file-length.check.md", PAGE_TYPES, FILE_PROPERTIES).kind).toBe("stray")
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

test("what besideAt puts together in another kind of file, heldIn takes apart too", () => {
  const page = "akasha/one/sophia.persona.ts"
  const beside = besideAt(page, "portrait", "md")
  if (beside === null) throw new Error("expected a name beside the page")
  expect(beside).toBe("akasha/one/sophia.persona.portrait.md")
  const said = heldIn(beside, PAGE_TYPES, PORTRAIT)
  expect(said.kind).toBe("property")
  expect(said.propertySlug).toBe("portrait")
  expect(said.page).toBe("sophia.persona")
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
    part: 1,
    uncommitted: true,
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
  expect(pageNamed("akasha/one/file-length.check.uncommitted.ts", new Set(["uncommitted"]))).toBe(
    false
  )
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

test("a name tailed `uncommitted` is answered as one, and a page or property file is not", () => {
  expect(uncommittedNamed("akasha/one/file-length.check.uncommitted.ts")).toBe(true)
  expect(uncommittedNamed("akasha/one/file-length.check.ts")).toBe(false)
  expect(uncommittedNamed("akasha/one/file-length.check.code.ts")).toBe(false)
})

test("a file tailed `sops` is held as its page's secret values, not as a property", () => {
  expect(heldIn("akasha/one/aine.claude-account.sops.yaml", PAGE_TYPES, FILE_PROPERTIES)).toEqual({
    path: "akasha/one/aine.claude-account.sops.yaml",
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
  const held = heldIn(
    "akasha/one/aine.claude-account.sops.yaml",
    PAGE_TYPES,
    new Set(["code", "sops"])
  )
  expect(held.kind).toBe("secret")
  expect(held.propertySlug).toBeNull()
  expect(pageNamed("akasha/one/aine.claude-account.sops.ts", new Set(["sops"]))).toBe(false)
})

test("a sops file stands beside its page, and heldIn takes that name apart again", () => {
  const page = "akasha/one/aine.claude-account.ts"
  const beside = secretAt(page)
  expect(beside).toBe("akasha/one/aine.claude-account.sops.yaml")
  if (beside === null) throw new Error("expected a name beside the page")
  expect(heldIn(beside, PAGE_TYPES, FILE_PROPERTIES).page).toBe("aine.claude-account")
})

test("a path that is no TypeScript file carries no sops file", () => {
  expect(secretAt("akasha/one/notes.txt")).toBeNull()
})

test("a name tailed `sops` is answered as one, and a page or property or uncommitted file is not", () => {
  expect(secretNamed("akasha/one/aine.claude-account.sops.yaml")).toBe(true)
  expect(secretNamed("akasha/one/aine.claude-account.ts")).toBe(false)
  expect(secretNamed("akasha/one/file-length.check.code.ts")).toBe(false)
  expect(secretNamed("akasha/one/file-length.check.uncommitted.ts")).toBe(false)
})

test("a name is read from its slug, and what follows the page type is a list of sections", () => {
  expect(partedIn("akasha/one/file-length.check.ts")).toEqual({
    slug: "file-length",
    pageType: "check",
    sections: [],
    held: "ts",
  })
  expect(partedIn("akasha/one/file-length.check.code.ts")).toEqual({
    slug: "file-length",
    pageType: "check",
    sections: ["code"],
    held: "ts",
  })
})

test("a name carrying two sections carries both of them, in the order they are written", () => {
  expect(partedIn("akasha/one/file-length.check.lines.uncommitted.jsonl")).toEqual({
    slug: "file-length",
    pageType: "check",
    sections: ["lines", "uncommitted"],
    held: "jsonl",
  })
})

test("a name carrying three sections carries all three, so how many there are is free", () => {
  expect(partedIn("akasha/one/dalla.seat.uncommitted.ts.a1b2.part")).toEqual({
    slug: "dalla",
    pageType: "seat",
    sections: ["uncommitted", "ts", "a1b2"],
    held: "part",
  })
})

test("a slug carrying hyphens and digits still anchors the name at its first part", () => {
  expect(partedIn("akasha/one/page-file-name.module.code.ts")).toEqual({
    slug: "page-file-name",
    pageType: "module",
    sections: ["code"],
    held: "ts",
  })
  expect(partedIn("akasha/one/temper-0000000000000fff.error.uncommitted.ts")).toEqual({
    slug: "temper-0000000000000fff",
    pageType: "error",
    sections: ["uncommitted"],
    held: "ts",
  })
})

test("a part written in anything but lower kebab case answers nothing", () => {
  expect(partedIn("akasha/one/File-Length.check.ts")).toBeNull()
  expect(partedIn("akasha/one/file_length.check.ts")).toBeNull()
  expect(partedIn("akasha/one/file-length.check.CODE.ts")).toBeNull()
})

test("a name carrying sections nothing here knows is held as a stray", () => {
  expect(kindOf("akasha/one/dalla.seat.uncommitted.ts.a1b2.part")).toBe("stray")
  expect(kindOf("akasha/one/file-length.check.lines.uncommitted.jsonl")).toBe("stray")
})

test("a page type nothing knows still holds a property, an uncommitted file and a sops file", () => {
  expect(kindOf("akasha/one/dalla.seat.code.ts")).toBe("property")
  expect(kindOf("akasha/one/dalla.seat.uncommitted.ts")).toBe("uncommitted")
  expect(kindOf("akasha/one/dalla.seat.sops.yaml")).toBe("secret")
  expect(kindOf("akasha/one/dalla.seat.ts")).toBe("stray")
})

function agreeing(
  path: string,
  pageTypes: ReadonlySet<string> = PAGE_TYPES,
  fileProperties: ReadonlySet<string> = FILE_PROPERTIES
): undefined {
  const kind = heldIn(path, pageTypes, fileProperties).kind
  expect(pageNamed(path, pageTypes)).toBe(kind === "page")
  expect(uncommittedNamed(path)).toBe(kind === "uncommitted")
  expect(secretNamed(path)).toBe(kind === "secret")
}

test("what heldIn answers of a name is what each predicate answers of that name", () => {
  agreeing("akasha/one/file-length.check.ts")
  agreeing("akasha/one/file-length.check.uncommitted.ts")
  agreeing("akasha/one/aine.claude-account.sops.yaml")
  agreeing("akasha/one/file-length.check.code.ts")
  agreeing("akasha/one/dalla.seat.patch.uncommitted.patch")
  agreeing("akasha/one/held.uncommitted.ts")
  agreeing("akasha/one/held.uncommitted.ts", new Set(["uncommitted"]))
  agreeing("akasha/one/held.sops.yaml")
  agreeing("akasha/one/notes.txt")
  agreeing("akasha/one/dalla.seat.patch.uncommitted.patch", PAGE_TYPES, PATCH)
  agreeing("akasha/one/dalla.seat.patch.sops.yaml", PAGE_TYPES, PATCH)
})

test("a reserved word in the page type slot names a page type rather than a file beside a page", () => {
  expect(uncommittedNamed("akasha/one/held.uncommitted.ts")).toBe(false)
  expect(secretNamed("akasha/one/held.sops.yaml")).toBe(false)
})

test("a values sidecar carries the one section, so a second section is no values sidecar", () => {
  expect(uncommittedNamed("akasha/one/dalla.seat.uncommitted.ts")).toBe(true)
  expect(secretNamed("akasha/one/dalla.seat.sops.yaml")).toBe(true)
  expect(uncommittedNamed("akasha/one/dalla.seat.patch.uncommitted.patch")).toBe(false)
  expect(secretNamed("akasha/one/dalla.seat.patch.sops.yaml")).toBe(false)
})

test("a file is outside the commit as a values sidecar or as a property sectioned that way", () => {
  expect(uncommittedHeld("akasha/one/dalla.seat.uncommitted.ts")).toBe(true)
  expect(uncommittedHeld("akasha/one/dalla.seat.patch.uncommitted.patch")).toBe(true)
  expect(uncommittedHeld("akasha/one/file-length.check.ts")).toBe(false)
  expect(uncommittedHeld("akasha/one/file-length.check.code.ts")).toBe(false)
  expect(uncommittedHeld("akasha/one/held.uncommitted.ts")).toBe(false)
  expect(uncommittedHeld("akasha/one/notes.txt")).toBe(false)
})

test("a file property is held uncommitted under its own slug and then `uncommitted`", () => {
  const path = "akasha/one/dalla.seat.patch.uncommitted.patch"
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
  expect(heldIn("akasha/one/dalla.seat.notes.uncommitted.md", PAGE_TYPES, PATCH).kind).toBe("stray")
})

test("what uncommittedBesideAt puts together, heldIn takes apart again", () => {
  const beside = uncommittedBesideAt("akasha/one/dalla.seat.ts", "patch", "patch")
  expect(beside).toBe("akasha/one/dalla.seat.patch.uncommitted.patch")
  if (beside === null) throw new Error("expected a name beside the page")
  expect(heldIn(beside, PAGE_TYPES, PATCH).propertySlug).toBe("patch")
  expect(uncommittedBesideAt("akasha/one/notes.txt", "patch", "patch")).toBeNull()
})

test("a property held uncommitted is no values sidecar, however the sets read its slug", () => {
  const path = "akasha/one/dalla.seat.patch.uncommitted.patch"
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
