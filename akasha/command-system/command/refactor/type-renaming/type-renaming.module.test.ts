import { afterAll, expect, test } from "bun:test"
import {
  pathFiled,
  standingFiled,
} from "../../../../pages-system/indexes/index-reading/index-reading.module.test-fixtures.ts"
import { scratchWorld } from "../../../scratching/scratching.module.code.ts"
import {
  carriesFor,
  type Renaming,
  renamingFor,
  restated,
  tailRenamed,
  typePageRenamed,
} from "./type-renaming.module.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

const SEAT_AT = "akasha/seat-system/seat/seat.page-type.ts"

const SEAT_ID = "01a0587b-0000-7000-8000-00000000000a"

function world(): string {
  const root = scratch.rootFor("akasha-type-renaming-")
  standingFiled(root, "page-type", "seat", [{ path: SEAT_AT, id: SEAT_ID }])
  standingFiled(root, "page-type", "module", [
    { path: "akasha/code-system/module/module.page-type.ts", id: "01a0587b-0000-7000-8000-b" },
  ])
  return root
}

const RENAMING: Renaming = {
  id: SEAT_ID,
  path: SEAT_AT,
  was: "seat",
  now: "chair",
  plural: "chairs",
}

test("the slug `page-type` is not renamed here", () => {
  const said = renamingFor(world(), "page-type", "kind", "kinds")
  expect(said).toHaveProperty("refused")
  expect("refused" in said && said.refused).toContain("nothing able to read the rename")
})

test("a slug no page type carries is refused rather than answered as nothing to do", () => {
  const said = renamingFor(world(), "nowhere", "chair", "chairs")
  expect("refused" in said && said.refused).toContain("no page type carries the slug `nowhere`")
})

test("a slug another page type already carries is refused", () => {
  const said = renamingFor(world(), "seat", "module", "modules")
  expect("refused" in said && said.refused).toContain("already carries the slug `module`")
})

test("a slug that is already what it would become is refused", () => {
  const said = renamingFor(world(), "seat", "seat", "seats")
  expect("refused" in said && said.refused).toContain("nothing to rename")
})

test("a plural is asked for, and one that is no slug is refused", () => {
  const said = renamingFor(world(), "seat", "chair", "Chairs")
  expect("refused" in said && said.refused).toContain("lower kebab case")
})

test("a rename that stands answers the page type it names", () => {
  const said = renamingFor(world(), "seat", "chair", "chairs")
  expect("renaming" in said && said.renaming).toEqual(RENAMING)
})

test("a page type's own file carries its slug, its plural and the name it is exported under", () => {
  const text =
    'export const seat = {\n  id: "a",\n  pageTypeSlug: "page-type",\n' +
    '  slug: "seat",\n  pluralSlug: "seats",\n} as const\n'
  const said = restated(
    SEAT_AT,
    text,
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

test("a path the index files that stands nowhere on disk is not carried", () => {
  const root = world()
  pathFiled(root, SEAT_AT, [{ path: SEAT_AT, id: SEAT_ID }])
  pathFiled(root, "akasha/seat-system/seat/seats/one.seat.ts", [
    { path: "akasha/seat-system/seat/seats/one.seat.ts", id: "01a0587b-0000-7000-8000-c" },
  ])
  pathFiled(root, "akasha/seat-system/seat/seats/one.seat.sops.yaml", [
    { path: "akasha/seat-system/seat/seats/one.seat.sops.yaml", id: "01a0587b-0000-7000-8000-c" },
  ])
  const stands = new Set([SEAT_AT, "akasha/seat-system/seat/seats/one.seat.ts"])
  const carries = carriesFor(root, RENAMING, (path) => stands.has(path))
  expect(carries.map((one) => one.to)).toEqual([
    "akasha/seat-system/chair/chair.page-type.ts",
    "akasha/seat-system/chair/seats/one.chair.ts",
  ])
})
