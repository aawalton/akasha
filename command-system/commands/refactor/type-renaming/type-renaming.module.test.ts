import { afterAll, expect, test } from "bun:test"
import { listedFiled, pathFiled } from "@akasha/indexes/testing"
import { scratchWorld } from "../../../scratching/scratching.module.code.ts"
import {
  carriesFor,
  type Renaming,
  relocated,
  renamingFor,
  restated,
  statedAs,
  tailRenamed,
  typePageRenamed,
} from "./type-renaming.module.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

const SEAT_AT = "akasha/seat-system/seats/seat.page-type.ts"

const SEAT_ID = "01a0587b-0000-7000-8000-00000000000a"

const SEAT_BODY =
  'export const seat = {\n  id: "a",\n  pageTypeSlug: "page-type",\n' +
  '  slug: "seat",\n  pluralSlug: "seats",\n} as const\n'

function bodied(said: string | null = SEAT_BODY): (path: string) => string | null {
  return () => said
}

function world(): string {
  const root = scratch.rootFor("akasha-type-renaming-")
  listedFiled(root, "page-type", "seat", [{ path: SEAT_AT, id: SEAT_ID }])
  listedFiled(root, "page-type", "module", [
    { path: "akasha/code-system/modules/module.page-type.ts", id: "01a0587b-0000-7000-8000-b" },
  ])
  return root
}

const RENAMING: Renaming = {
  id: SEAT_ID,
  path: SEAT_AT,
  was: "seat",
  now: "chair",
  wasPlural: "seats",
  plural: "chairs",
}

test("the slug `page-type` is not renamed here", () => {
  const said = renamingFor(world(), "page-type", "kind", "kinds", bodied())
  expect(said).toHaveProperty("refused")
  expect("refused" in said && said.refused).toContain("nothing able to read the rename")
})

test("a slug no page type carries is refused rather than answered as nothing to do", () => {
  const said = renamingFor(world(), "nowhere", "chair", "chairs", bodied())
  expect("refused" in said && said.refused).toContain("no page type carries the slug `nowhere`")
})

test("a slug another page type already carries is refused", () => {
  const said = renamingFor(world(), "seat", "module", "modules", bodied())
  expect("refused" in said && said.refused).toContain("already carries the slug `module`")
})

test("a slug that is already what it would become is refused", () => {
  const said = renamingFor(world(), "seat", "seat", "seats", bodied())
  expect("refused" in said && said.refused).toContain("nothing to rename")
})

test("a plural is asked for, and one that is no slug is refused", () => {
  const said = renamingFor(world(), "seat", "chair", "Chairs", bodied())
  expect("refused" in said && said.refused).toContain("lower kebab case")
})

test("a page type whose body cannot be read is refused rather than renamed without its plural", () => {
  const said = renamingFor(world(), "seat", "chair", "chairs", bodied(null))
  expect("refused" in said && said.refused).toContain("body could not be read")
})

test("a page type stating no plural is refused, the folder holding its pages being unnamed", () => {
  const body = 'export const seat = {\n  slug: "seat",\n} as const\n'
  const said = renamingFor(world(), "seat", "chair", "chairs", bodied(body))
  expect("refused" in said && said.refused).toContain("states no `pluralSlug`")
})

test("a rename that stands answers the page type it names and the plural it carries now", () => {
  const said = renamingFor(world(), "seat", "chair", "chairs", bodied())
  expect("renaming" in said && said.renaming).toEqual(RENAMING)
})

test("a page type's own file carries its slug, its plural and the name it is exported under", () => {
  const said = restated(
    SEAT_AT,
    SEAT_BODY,
    new Map([
      ["slug", "chair"],
      ["pluralSlug", "chairs"],
    ]),
    "chair"
  )
  expect(said).toContain("export const chair =")
  expect(said).toContain('slug: "chair"')
  expect(said).toContain('pluralSlug: "chairs"')
  expect(said).toContain('pageTypeSlug: "page-type"')
})

test("what a page states is read back by its key rather than by matching text", () => {
  expect(statedAs(SEAT_AT, SEAT_BODY, "pluralSlug")).toBe("seats")
  expect(statedAs(SEAT_AT, SEAT_BODY, "nowhere")).toBe(null)
})

test("a value equal to the slug that is not the slug is left alone", () => {
  const text = 'export const held = {\n  slug: "seat",\n  roleSlug: "seat",\n} as const\n'
  const said = restated("akasha/held.seat.ts", text, new Map([["slug", "chair"]]))
  expect(said).toContain('slug: "chair"')
  expect(said).toContain('roleSlug: "seat"')
})

test("only the tail of a file's name says which page type it is", () => {
  expect(tailRenamed("akasha/seat-system/seat/seats/one.seat.ts", RENAMING)).toBe(
    "akasha/seat-system/seat/seats/one.chair.ts"
  )
  expect(tailRenamed("akasha/seat-system/seat/seats/one.seat.sops.yaml", RENAMING)).toBe(
    "akasha/seat-system/seat/seats/one.chair.sops.yaml"
  )
  expect(tailRenamed("akasha/seat-system/seat/seat-reading.module.ts", RENAMING)).toBe(null)
})

test("the folder a page type stands in is named for it and moves with it", () => {
  expect(typePageRenamed(RENAMING)).toEqual({
    from: SEAT_AT,
    to: "akasha/seat-system/chair/chair.page-type.ts",
  })
})

test("a page type whose folder is not named for it moves its file alone", () => {
  const one: Renaming = { ...RENAMING, path: "akasha/elsewhere/seat.page-type.ts" }
  expect(typePageRenamed(one)).toEqual({
    from: "akasha/elsewhere/seat.page-type.ts",
    to: "akasha/elsewhere/chair.page-type.ts",
  })
})

test("the folder holding many pages of the type is named for the plural and moves with it", () => {
  const under = "akasha/seat-system/seat/"
  const moved = "akasha/seat-system/chair/"
  expect(relocated(`${under}seats/one.chair.ts`, RENAMING, under, moved)).toBe(
    `${moved}chairs/one.chair.ts`
  )
})

test("a folder under the type that is not its plural keeps the name it has", () => {
  const under = "akasha/seat-system/seat/"
  const moved = "akasha/seat-system/chair/"
  expect(relocated(`${under}properties/on-call.boolean-property.ts`, RENAMING, under, moved)).toBe(
    `${moved}properties/on-call.boolean-property.ts`
  )
})

test("a plural that does not change leaves the folder named for it where it stands", () => {
  const one: Renaming = { ...RENAMING, plural: "seats" }
  const under = "akasha/seat-system/seat/"
  const moved = "akasha/seat-system/chair/"
  expect(relocated(`${under}seats/one.chair.ts`, one, under, moved)).toBe(
    `${moved}seats/one.chair.ts`
  )
})

test("a path the index files that stands nowhere on disk is not carried", () => {
  const root = world()
  pathFiled(root, SEAT_AT, [{ path: SEAT_AT, id: SEAT_ID }])
  pathFiled(root, "akasha/seat-system/seat/seats/one.seat.ts", [
    { path: "akasha/seat-system/seat/seats/one.seat.ts", id: "01a0587b-0000-7000-8000-c" },
  ])
  pathFiled(root, "akasha/seat-system/seat/seats/one.seat.sops.yaml", [
    { path: "akasha/seat-system/seat/seats/one.seat.sops.yaml", id: "01a0587b-0000-7000-8000-c" },
  ])
  const onDisk = new Set([SEAT_AT, "akasha/seat-system/seat/seats/one.seat.ts"])
  const carries = carriesFor(root, RENAMING, (path) => onDisk.has(path))
  expect(carries.map((one) => one.to)).toEqual([
    "akasha/seat-system/chair/chair.page-type.ts",
    "akasha/seat-system/chair/chairs/one.chair.ts",
  ])
})
