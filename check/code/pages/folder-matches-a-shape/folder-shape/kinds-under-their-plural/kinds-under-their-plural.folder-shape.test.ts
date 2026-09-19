import { expect, test } from "bun:test"
import {
  folderFrom,
  gatheringFrom,
} from "akasha/check/code/pages/folder-matches-a-shape/folder-matches-a-shape.check-code.decision.test-fixtures.ts"
import type { Standing } from "akasha/check/code/pages/folder-matches-a-shape/folder-shape/folder-shape.page-type.ts"
import { kindsUnderTheirPlural } from "akasha/check/code/pages/folder-matches-a-shape/folder-shape/kinds-under-their-plural/kinds-under-their-plural.folder-shape.code.ts"

const WORLD = "story/world/pages/ember"

const MECHANICS = `${WORLD}/mechanics`

const STORIES = `${WORLD}/stories`

const PAGE_TYPES = new Set<string>(["world", "world-class", "world-skill", "book"])

const ABOVE: Record<string, string> = {
  "world-class": "world-mechanic",
  "world-skill": "world-mechanic",
}

const extending: Standing["extending"] = (pageTypeSlug, wanted) =>
  pageTypeSlug === wanted || ABOVE[pageTypeSlug] === wanted

const gathered = gatheringFrom({
  mechanics: ["world-mechanic"],
  stories: ["story-read", "story-written", "story-played"],
  classes: ["world-class"],
  skills: ["world-skill"],
  books: ["book"],
})

function over(folder: string, deep: readonly string[]): (names: readonly string[]) => Standing {
  return folderFrom({ folder, pageTypes: PAGE_TYPES, extending, gathered, deep })
}

const MECHANIC_KINDS = ["classes/fire.world-class.ts", "skills/dodge.world-skill.ts"]

test("the kind folders under a world's mechanics take the shape", () => {
  expect(kindsUnderTheirPlural(over(MECHANICS, MECHANIC_KINDS)([]))).toEqual([])
})

test("the read, written and played folders under a world's stories take the shape", () => {
  const said = kindsUnderTheirPlural(
    over(STORIES, [
      "read/one/one.story-read.ts",
      "written/two/two.story-written.ts",
      "played/three/three.story-played.ts",
    ])([])
  )
  expect(said).toEqual([])
})

test("a subfolder named a covered page type's own slug takes the shape", () => {
  expect(kindsUnderTheirPlural(over(MECHANICS, ["world-mechanic/one.book.ts"])([]))).toEqual([])
})

test("a folder named no page type's plural is refused, and the reason names it", () => {
  const said = kindsUnderTheirPlural(over(`${WORLD}/widgets`, MECHANIC_KINDS)([]))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("widgets")
})

test("a subfolder named for no page type that plural covers is refused", () => {
  const said = kindsUnderTheirPlural(
    over(MECHANICS, [...MECHANIC_KINDS, "notes/one.world-class.ts"])([])
  )
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("notes")
})

test("a subfolder named the plural of a page type that plural covers nothing of is refused", () => {
  const said = kindsUnderTheirPlural(over(MECHANICS, ["books/one.book.ts"])([]))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("books")
})

test("a page of the folder's own is refused", () => {
  const said = kindsUnderTheirPlural(over(MECHANICS, MECHANIC_KINDS)(["ember.world.ts"]))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("ember.world.ts")
})

test("a file that is no page is refused", () => {
  const said = kindsUnderTheirPlural(over(MECHANICS, MECHANIC_KINDS)(["notes.txt"]))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("notes.txt")
})

test("a folder gathering nothing is refused", () => {
  expect(kindsUnderTheirPlural(over(MECHANICS, [])([]))).toEqual(["it gathers nothing"])
})
