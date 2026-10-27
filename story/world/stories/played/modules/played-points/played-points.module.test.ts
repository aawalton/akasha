import { expect, test } from "bun:test"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import { characterPlayer } from "akasha/story/world/characters/character-player/character-player.page-type.ts"
import {
  labelOf,
  pointsIn,
  unpointed,
} from "akasha/story/world/stories/played/modules/played-points/played-points.module.code.ts"

const ALAN = namedAs(characterPlayer.slug, "the-tower-alan", null)

const NALA = namedAs(characterPlayer.slug, "overwhere-iv-nala", null)

test("a point is labelled by its kind less the words its character's slug has", () => {
  expect(labelOf("tower-attribute-point", "the-tower-alan", ALAN, 3)).toBe("Attribute Points")
  expect(labelOf("tower-attribute-point", "the-tower-alan", ALAN, 1)).toBe("Attribute Point")
})

test("a point page adding a word to its character's slug puts that word first", () => {
  expect(labelOf("overwhere-iv-points", "overwhere-iv-nala-skill", NALA, 2)).toBe("Skill Points")
})

test("only points holding more than none are answered, in display order", () => {
  const rows = [
    { values: { type: "overwhere-iv-points", slug: "overwhere-iv-nala-trait", value: 1 } },
    {
      values: {
        type: "overwhere-iv-points",
        slug: "overwhere-iv-nala-skill",
        value: 2,
        displayOrder: 1,
      },
    },
    { values: { type: "overwhere-iv-points", slug: "overwhere-iv-nala-legend", value: 0 } },
  ]
  expect(pointsIn(rows, NALA).points).toEqual([
    { label: "Skill Points", value: 2 },
    { label: "Trait Point", value: 1 },
  ])
})

test("a point page is taken out of the resources, spent or not", () => {
  const point = { values: { type: "tower-attribute-point", slug: "the-tower-alan", value: 0 } }
  const health = { values: { type: "tower-health", slug: "the-tower-alan", value: 9 } }
  expect(unpointed([point, health], pointsIn([point], ALAN))).toEqual([health])
})
