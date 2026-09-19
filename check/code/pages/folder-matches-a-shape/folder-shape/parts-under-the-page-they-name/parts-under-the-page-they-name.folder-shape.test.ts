import { expect, test } from "bun:test"
import {
  folderFrom,
  gatheringFrom,
  holdsFrom,
} from "akasha/check/code/pages/folder-matches-a-shape/folder-matches-a-shape.check-code.decision.test-fixtures.ts"
import type { Standing } from "akasha/check/code/pages/folder-matches-a-shape/folder-shape/folder-shape.page-type.ts"
import { partsUnderThePageTheyName } from "akasha/check/code/pages/folder-matches-a-shape/folder-shape/parts-under-the-page-they-name/parts-under-the-page-they-name.folder-shape.code.ts"

const WORLD = "story/world/pages/ember"

const FOLDER = `${WORLD}/characters`

const EMBER = "world/ember"

const ASH = "world/ash"

const PAGE_TYPES = new Set<string>(["world", "world-character", "world-hero", "world-mechanic"])

const BELOW: Record<string, string> = { "world-hero": "world-character" }

const gathered = gatheringFrom({ characters: ["world-character"], mechanics: ["world-mechanic"] })

type Over = {
  readonly folder?: string
  readonly deep?: readonly string[]
  readonly holds?: Standing["holds"]
  readonly pathsHeld?: Standing["pathsHeld"]
  readonly addressing?: Standing["addressing"]
  readonly parts?: Standing["parts"]
}

function over(said: Over): (names: readonly string[]) => Standing {
  return folderFrom({
    folder: said.folder ?? FOLDER,
    pageTypes: PAGE_TYPES,
    fileProperties: new Set<string>(["portrait"]),
    extending: (pageTypeSlug, wanted) => pageTypeSlug === wanted || BELOW[pageTypeSlug] === wanted,
    gathered,
    holds: said.holds ?? holdsFrom({ [WORLD]: [EMBER] }),
    pathsHeld: said.pathsHeld ?? holdsFrom({}),
    addressing: said.addressing ?? ((): readonly string[] => [EMBER]),
    parts: said.parts ?? ((page) => [page.path]),
    deep: said.deep ?? [],
  })
}

const IRIS_AT = `${FOLDER}/iris/iris.world-character.ts`

const NOVA_AT = `${FOLDER}/nova/nova.world-character.ts`

const folder = over({})

test("the characters naming the world above take the shape", () => {
  const said = partsUnderThePageTheyName(
    folder(["iris.world-character.ts", "nova.world-character.ts"])
  )
  expect(said).toEqual([])
})

test("a character of a page type extending the one gathered takes the shape", () => {
  expect(partsUnderThePageTheyName(folder(["iris.world-hero.ts"]))).toEqual([])
})

test("a character in a folder of its own takes the shape", () => {
  const held = over({
    deep: ["iris/iris.world-character.ts", "iris/iris.world-character.portrait.png"],
    holds: holdsFrom({ [WORLD]: [EMBER], [`${FOLDER}/iris`]: ["world-character/iris"] }),
    pathsHeld: holdsFrom({ [`${FOLDER}/iris`]: [IRIS_AT] }),
  })
  expect(partsUnderThePageTheyName(held([]))).toEqual([])
})

test("a character in a folder of its own naming another world is refused", () => {
  const held = over({
    deep: ["iris/iris.world-character.ts", "nova/nova.world-character.ts"],
    holds: holdsFrom({
      [WORLD]: [EMBER],
      [`${FOLDER}/iris`]: ["world-character/iris"],
      [`${FOLDER}/nova`]: ["world-character/nova"],
    }),
    pathsHeld: holdsFrom({ [`${FOLDER}/iris`]: [IRIS_AT], [`${FOLDER}/nova`]: [NOVA_AT] }),
    addressing: (at) => (at === NOVA_AT ? [ASH] : [EMBER]),
  })
  const said = partsUnderThePageTheyName(held([]))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain(`\`${EMBER}\``)
  expect(said[0]).toContain("nova")
})

test("a character carrying a file the page states takes the shape", () => {
  const held = over({
    parts: (page) => [page.path, `${FOLDER}/iris.world-character.portrait.png`],
  })
  const said = partsUnderThePageTheyName(
    held(["iris.world-character.ts", "iris.world-character.portrait.png"])
  )
  expect(said).toEqual([])
})

test("the world above answering with two addresses is the one the characters name", () => {
  const held = over({ holds: holdsFrom({ [WORLD]: ["domain/ember", EMBER] }) })
  expect(partsUnderThePageTheyName(held(["iris.world-character.ts"]))).toEqual([])
})

test("a folder named no page type's plural is refused, and the reason names it", () => {
  const held = over({ folder: `${WORLD}/widgets` })
  const said = partsUnderThePageTheyName(held(["iris.world-character.ts"]))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("widgets")
})

test("a folder above holding no page of its own is refused", () => {
  const held = over({ holds: holdsFrom({}) })
  const said = partsUnderThePageTheyName(held(["iris.world-character.ts"]))
  expect(said).toEqual(["the folder above holds no page of its own"])
})

test("a page gathered under another name is refused", () => {
  const said = partsUnderThePageTheyName(
    folder(["iris.world-character.ts", "flame.world-mechanic.ts"])
  )
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("flame.world-mechanic.ts")
})

test("a character naming another world is refused", () => {
  const held = over({
    addressing: (at) => (at === `${FOLDER}/nova.world-character.ts` ? [ASH] : [EMBER]),
  })
  const said = partsUnderThePageTheyName(
    held(["iris.world-character.ts", "nova.world-character.ts"])
  )
  expect(said).toHaveLength(1)
  expect(said[0]).toContain(`\`${EMBER}\``)
  expect(said[0]).toContain("nova.world-character.ts")
})

test("a file beside a page that page states nowhere is refused", () => {
  const said = partsUnderThePageTheyName(
    folder(["iris.world-character.ts", "iris.world-character.portrait.png"])
  )
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("iris.world-character.portrait.png")
})

test("a file that is neither a page nor a file beside one is refused", () => {
  const said = partsUnderThePageTheyName(folder(["iris.world-character.ts", "notes.txt"]))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("notes.txt")
})

test("a folder gathering no page at all is refused", () => {
  expect(partsUnderThePageTheyName(folder([]))).toEqual(["it holds no page"])
})
