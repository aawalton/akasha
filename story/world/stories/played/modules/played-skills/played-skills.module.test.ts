import { expect, test } from "bun:test"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import { characterPlayer } from "akasha/story/world/characters/character-player/character-player.page-type.ts"
import { testStoryPlayer } from "akasha/story/world/pages/test-world/stories/played/test-story/characters/test-story-player.character-player.ts"
import { testStoryPlayerWits } from "akasha/story/world/pages/test-world/stories/played/test-story/mechanics/metrics/stats/test-story-player-wits.metric-character-stat.ts"
import {
  attributeOf,
  skillMoreOf,
} from "akasha/story/world/stories/played/modules/played-skills/played-skills.module.code.ts"

const HOLDER = namedAs(characterPlayer.slug, testStoryPlayer.slug, null)

const WITS = namedAs("metric-character-stat", testStoryPlayerWits.slug, null)

test("a skill's attribute is named by what its slug adds to its holder's", () => {
  const row = { values: { character: HOLDER, attribute: WITS } }
  expect(attributeOf(row, new Map())).toBe("WITS")
})

test("a skill's attribute page stating a title is named by that title", () => {
  const row = { values: { character: HOLDER, attribute: WITS } }
  expect(attributeOf(row, new Map([[WITS, "Cunning"]]))).toBe("CUNNING")
})

test("a holding states its experience and attribute, and a bare one states neither", () => {
  const more = skillMoreOf(new Map())
  expect(more({ values: { character: HOLDER, attribute: WITS, experience: 12 } })).toEqual({
    experience: 12,
    attribute: "WITS",
  })
  expect(more({ values: { character: HOLDER } })).toEqual({})
})
