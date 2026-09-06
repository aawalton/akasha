import { afterAll, expect, test } from "bun:test"
import {
  aProperty,
  bodyOf,
  HELD_CODE,
  HELD_PAGE,
  idOf,
  indexedRepo,
  NAMER_PAGE,
  pageOf,
  scratch,
  textIn,
} from "@akasha/indexes/indexing/testing"
import { type Shadow, shadowAt } from "@akasha/pages/shadow"
import { answered, taking } from "../../modules/change-answer/change-answer.module.code.ts"
import type { Answer } from "../../modules/change-answer/change-answer.module.types.ts"
import { shadowOver } from "../../modules/change-shadow/change-shadow.module.code.ts"
import { parentsOf, removePage } from "./remove-page.change.code.ts"

afterAll(scratch.sweep)

const MISSING = "akasha/one/missing.module.ts"

const NOTES = aProperty(idOf("d"), "notes", "file-property")

const KEPT_TYPE = "akasha/kept.page-type.ts"

const KEPT_PAGE = "akasha/kept/one.kept.ts"

const KEPT_NOTES = "akasha/kept/one.kept.notes.uncommitted.jsonl"

function keptRepo(): string {
  return indexedRepo({
    [`akasha/${NOTES[0]}`]: bodyOf(NOTES[1]),
    [KEPT_TYPE]: bodyOf({
      id: idOf("e"),
      pageTypeSlug: "page-type",
      slug: "kept",
      extendsSlug: ["page-type/page"],
      properties: [
        {
          pagePropertySlug: "notes",
          required: false,
          many: false,
          uncommitted: true,
          default: "jsonl",
        },
      ],
    }),
    [KEPT_PAGE]: pageOf({ id: idOf("f"), pageTypeSlug: "kept", slug: "one" }),
    [KEPT_NOTES]: '{"held":1}\n',
  })
}

function tookAway(root: string, path: string): Answer {
  return answered([taking(path, textIn(root)(path) ?? "")])
}

function shadowFrom(root: string, said: Answer): Shadow {
  const cast = shadowOver(root, said)
  if ("refused" in cast) throw new Error(cast.refused)
  return cast.shadow
}

test("a page and the file beside that page are taken away together", () => {
  const root = indexedRepo()
  const was = textIn(root)

  const said = removePage(root, shadowAt(root), { at: HELD_PAGE }, was)

  expect(said.refused).toBe(null)
  expect(said.edits.map((one) => one.path).sort()).toEqual([HELD_CODE, HELD_PAGE])
  for (const one of said.edits) {
    expect(one.body).toBe(null)
    expect(one.was).toBe(was(one.path))
  }
})

test("a path the shadow names no page at is refused", () => {
  const root = indexedRepo()

  const said = removePage(root, shadowAt(root), { at: MISSING }, textIn(root))

  expect(said.edits).toEqual([])
  expect(said.refused).toBe(`\`${MISSING}\` names no page, so no page is taken away`)
})

test("a page holding no body is refused by the removal of its own file", () => {
  const root = indexedRepo()
  const was = textIn(root)
  const reading = (path: string): string | null => (path === HELD_PAGE ? null : was(path))

  const said = removePage(root, shadowAt(root), { at: HELD_PAGE }, reading)

  expect(said.edits).toEqual([])
  expect(said.refused).toBe(`\`${HELD_PAGE}\` holds no body, so a removal takes nothing away`)
})

test("a file beside the page git does not track is taken away too", () => {
  const root = keptRepo()

  const said = removePage(root, shadowAt(root), { at: KEPT_PAGE }, textIn(root))

  expect(said.refused).toBe(null)
  expect(said.edits.map((one) => one.path).sort()).toEqual([KEPT_NOTES, KEPT_PAGE])
})

test("a page an earlier change in the same answer took away is no page here", () => {
  const root = indexedRepo()
  const shadow = shadowFrom(root, tookAway(root, HELD_PAGE))

  const said = removePage(root, shadow, { at: HELD_PAGE }, textIn(root))

  expect(said.edits).toEqual([])
  expect(said.refused).toBe(`\`${HELD_PAGE}\` names no page, so no page is taken away`)
})

test("the parent naming the page in part-slugs is answered from the shadow", () => {
  const root = indexedRepo()

  expect(parentsOf(shadowAt(root), HELD_PAGE)).toEqual([
    { path: NAMER_PAGE, propertySlug: "part-slugs" },
  ])
})

test("a parent an earlier change in the same answer took away is answered no longer", () => {
  const root = indexedRepo()
  const shadow = shadowFrom(root, tookAway(root, NAMER_PAGE))

  expect(parentsOf(shadow, HELD_PAGE)).toEqual([])
})
