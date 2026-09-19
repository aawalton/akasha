import { expect, test } from "bun:test"
import {
  folderFrom,
  gatheringFrom,
  holdsFrom,
} from "akasha/check/code/pages/folder-matches-a-shape/folder-matches-a-shape.check-code.decision.test-fixtures.ts"
import type { Standing } from "akasha/check/code/pages/folder-matches-a-shape/folder-shape/folder-shape.page-type.ts"
import { pagesOfTheKindNamed } from "akasha/check/code/pages/folder-matches-a-shape/folder-shape/pages-of-the-kind-named/pages-of-the-kind-named.folder-shape.code.ts"

const WORLD = "story/world/pages/ember"

const CLASSES = `${WORLD}/mechanics/classes`

const READ = `${WORLD}/stories/read`

const PAGE_TYPES = new Set<string>([
  "world-class",
  "world-battle-class",
  "world-skill",
  "story-read",
  "story-written",
])

const OVER: Record<string, string> = {
  "world-class": "world-mechanic",
  "world-skill": "world-mechanic",
  "world-battle-class": "world-class",
  "story-replay": "story-played",
}

const gathered = gatheringFrom({
  mechanics: ["world-mechanic"],
  stories: ["story-read", "story-written", "story-played"],
  classes: ["world-class"],
  skills: ["world-skill"],
  played: ["story-replay"],
})

type Over = {
  readonly folder: string
  readonly deep?: readonly string[]
  readonly holds?: Standing["holds"]
}

function over(said: Over): (names: readonly string[]) => Standing {
  return folderFrom({
    folder: said.folder,
    pageTypes: PAGE_TYPES,
    extending: (pageTypeSlug, wanted) => pageTypeSlug === wanted || OVER[pageTypeSlug] === wanted,
    gathered,
    holds: said.holds ?? holdsFrom({}),
    deep: said.deep ?? [],
  })
}

test("the class pages under a world's mechanics take the shape", () => {
  const said = pagesOfTheKindNamed(
    over({ folder: CLASSES })(["mage.world-class.ts", "rogue.world-class.ts"])
  )
  expect(said).toEqual([])
})

test("a page of a page type extending the one named takes the shape", () => {
  const said = pagesOfTheKindNamed(over({ folder: CLASSES })(["knight.world-battle-class.ts"]))
  expect(said).toEqual([])
})

test("a page carrying a file beside it takes the shape", () => {
  const said = pagesOfTheKindNamed(
    over({ folder: CLASSES })(["mage.world-class.ts", "mage.world-class.code.ts"])
  )
  expect(said).toEqual([])
})

test("the story folders under a world's read stories take the shape", () => {
  const said = pagesOfTheKindNamed(
    over({
      folder: READ,
      deep: ["dawn/dawn.story-read.ts", "dawn/chapters/one.story-chapter-read.ts"],
      holds: holdsFrom({ [`${READ}/dawn`]: ["story-read/dawn"] }),
    })([])
  )
  expect(said).toEqual([])
})

test("a folder whose folder above is named no page type's plural is refused", () => {
  const said = pagesOfTheKindNamed(
    over({ folder: `${WORLD}/widgets/classes` })(["mage.world-class.ts"])
  )
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("widgets")
})

test("a folder named for no page type that plural covers is refused", () => {
  const said = pagesOfTheKindNamed(
    over({ folder: `${WORLD}/mechanics/notes` })(["mage.world-class.ts"])
  )
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("no page type `mechanics` covers is named that")
})

test("a folder named for more than one page type that plural covers is refused", () => {
  const said = pagesOfTheKindNamed(
    over({ folder: `${WORLD}/stories/played` })(["dusk.story-read.ts"])
  )
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("2 page types named that")
})

test("a page of another page type is refused", () => {
  const said = pagesOfTheKindNamed(
    over({ folder: CLASSES })(["mage.world-class.ts", "dodge.world-skill.ts"])
  )
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("dodge.world-skill.ts")
})

test("a folder of its own holding no page of the kind named is refused", () => {
  const said = pagesOfTheKindNamed(
    over({
      folder: READ,
      deep: ["dusk/dusk.story-written.ts"],
      holds: holdsFrom({ [`${READ}/dusk`]: ["story-written/dusk"] }),
    })([])
  )
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("dusk")
})

test("a file that is neither a page nor a file beside one is refused", () => {
  const said = pagesOfTheKindNamed(over({ folder: CLASSES })(["mage.world-class.ts", "notes.txt"]))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("notes.txt")
})

test("a folder holding no page at all is refused", () => {
  expect(pagesOfTheKindNamed(over({ folder: CLASSES })([]))).toEqual(["it holds no page"])
})
