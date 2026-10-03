import { expect, test } from "bun:test"
import { worldCharacter } from "akasha/story/world/characters/world-character.page-type.ts"
import { worldRelationship } from "akasha/story/world/mechanics/relationships/world-relationship.page-type.ts"
import { otherwhereXMarthaDeane } from "akasha/story/world/pages/twelve-steps-to-transcendence-a-skill-grinding-litrpg/characters/otherwhere-x-martha-deane.character-other.ts"
import {
  added,
  settled,
} from "akasha/story/world/pages/twelve-steps-to-transcendence-a-skill-grinding-litrpg/stories/played/otherwhere-x/mechanics/checks/otherwhere-x-standing.world-check.settling.code.ts"

const MARTHA = { character: `${worldCharacter.slug}/${otherwhereXMarthaDeane.slug}` }

const NOTHING = { word: 0, respect: 0, aid: 0, fairness: 0, honesty: 0, wrongs: 0 }

test("a turn of honest work at the Sheaf warms a wary widow", () => {
  expect(
    settled({
      ...MARTHA,
      points: 6,
      ...NOTHING,
      word: 2,
      aid: 1,
      honesty: 1,
      why: {
        word: "scrubbed every pot she said she would",
        aid: "carried the water in unasked",
        honesty: "owned that she had nowhere to go",
      },
    })
  ).toEqual({ answered: { change: 4, points: 10, stance: "friendly" } })
})

test("a lie found out costs more than a kind turn earns", () => {
  expect(
    settled({
      ...MARTHA,
      points: 2,
      ...NOTHING,
      respect: 1,
      wrongs: 1,
      why: { respect: "thanked her", wrongs: "claimed kin in Wexley who do not exist" },
    })
  ).toEqual({ answered: { change: -2, points: 0, stance: "wary" } })
})

test("points below nought are cold", () => {
  expect(
    settled({ ...MARTHA, points: 1, ...NOTHING, wrongs: 1, why: { wrongs: "stole a loaf" } })
  ).toHaveProperty("answered.stance", "cold")
})

test("fifty points makes them hers", () => {
  expect(
    settled({ ...MARTHA, points: 49, ...NOTHING, aid: 1, why: { aid: "sat up with her fever" } })
  ).toHaveProperty("answered.stance", "hers")
})

test("a score above nought with no reason is refused", () => {
  expect(settled({ ...MARTHA, points: 0, ...NOTHING, word: 1, why: {} })).toHaveProperty("refused")
})

test("the change is added to the relationship's points", () => {
  const reading = { ...MARTHA, points: 0, ...NOTHING, word: 1, why: { word: "came back" } }
  expect(added(reading, { change: 1, points: 1, stance: "wary" })).toEqual([
    {
      page: `${worldRelationship.slug}/${otherwhereXMarthaDeane.slug}`,
      key: "relationshipPoints",
      by: 1,
    },
  ])
})
