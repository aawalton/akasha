import { expect, test } from "bun:test"
import {
  chosenIn,
  levelKept,
  levelsIn,
} from "akasha/story/ui/modules/difficulty-panel/difficulty-panel.module.code.tsx"
import { difficultyLevel } from "akasha/story/world/stories/played/difficulty-levels/difficulty-level.page-type.ts"
import { easy } from "akasha/story/world/stories/played/difficulty-levels/pages/easy.difficulty-level.ts"
import { hard } from "akasha/story/world/stories/played/difficulty-levels/pages/hard.difficulty-level.ts"
import { normal } from "akasha/story/world/stories/played/difficulty-levels/pages/normal.difficulty-level.ts"

function rowOf(level: typeof easy | typeof hard | typeof normal) {
  return {
    slug: level.slug,
    title: level.title,
    oddsModifier: level.oddsModifier,
    failureCeiling: level.failureCeiling,
  }
}

test("the levels are offered easiest first, by their odds modifier", () => {
  const offered = levelsIn([rowOf(hard), rowOf(easy), rowOf(normal)])
  expect(offered.map((one) => one.title)).toEqual([easy.title, normal.title, hard.title])
  expect(offered[0]?.address).toBe(`${difficultyLevel.slug}/${easy.slug}`)
})

test("a row missing its modifier is left out", () => {
  expect(levelsIn([{ slug: easy.slug, title: easy.title, failureCeiling: "" }])).toEqual([])
})

test("a story naming a level shows that level", () => {
  const named = `${difficultyLevel.slug}/${hard.slug}`
  expect(chosenIn([{ difficulty: named }])).toBe(named)
})

test("a story naming no level shows Normal", () => {
  expect(chosenIn([{}])).toBe(`${difficultyLevel.slug}/${normal.slug}`)
})

test("a story answering no address is refused before anything is written", async () => {
  expect(await levelKept("no-address", `${difficultyLevel.slug}/${hard.slug}`)).toContain(
    "no address"
  )
})
