import { expect, test } from "bun:test"
import {
  attunementsIn,
  type Titled,
  titlesIn,
} from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/attunements/modules/tower-attunements-beside/tower-attunements-beside.module.code.ts"
import { theTowerAlanEmber } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/attunements/pages/the-tower-alan-ember.tower-attunement.ts"
import { theTowerAlanForce } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/attunements/pages/the-tower-alan-force.tower-attunement.ts"
import { theTowerAffinity } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/attunements/ranks/pages/the-tower-affinity.tower-attunement-rank.ts"
import { theTowerManipulation } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/attunements/ranks/pages/the-tower-manipulation.tower-attunement-rank.ts"
import { theTowerSoul } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/attunements/ranks/pages/the-tower-soul.tower-attunement-rank.ts"
import { theTowerEmber } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/elements/pages/the-tower-ember.tower-element.ts"
import { theTowerForce } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/elements/pages/the-tower-force.tower-element.ts"
import { theTowerMind } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/elements/pages/the-tower-mind.tower-element.ts"

const ELEMENTS = {
  [theTowerEmber.slug]: theTowerEmber.title,
  [theTowerForce.slug]: theTowerForce.title,
}

const RANKS = {
  [theTowerManipulation.slug]: theTowerManipulation.title,
  [theTowerAffinity.slug]: theTowerAffinity.title,
}

function rowOf(element: unknown, rank: unknown, counter: unknown): Titled {
  return { values: { character: theTowerAlanEmber.character, element, rank, counter } }
}

const EMBER: Titled = { values: { ...theTowerAlanEmber } }

const FORCE: Titled = { values: { ...theTowerAlanForce } }

test("a title is filed under the slug of the page carrying that title", () => {
  const rows = [{ values: { slug: theTowerEmber.slug, title: theTowerEmber.title } }]
  expect(titlesIn(rows)).toEqual({ [theTowerEmber.slug]: theTowerEmber.title })
})

test("a page stating no title is left out of the titles", () => {
  const rows = [
    { values: { slug: theTowerEmber.slug } },
    { values: { slug: theTowerForce.slug, title: theTowerForce.title } },
  ]
  expect(titlesIn(rows)).toEqual({ [theTowerForce.slug]: theTowerForce.title })
})

test("an attunement is named by its element's title and its rank's title", () => {
  expect(attunementsIn([EMBER], ELEMENTS, RANKS)).toEqual([
    { name: "Ember Manipulation", value: theTowerAlanEmber.counter },
  ])
})

test("an attunement carries no note", () => {
  const [one] = attunementsIn([FORCE], ELEMENTS, RANKS)
  expect(one).toEqual({ name: "Force Affinity", value: theTowerAlanForce.counter })
  expect(Object.keys(one ?? {})).toEqual(["name", "value"])
})

test("a row whose element names no title is left out", () => {
  const row = rowOf(theTowerAlanEmber.element, theTowerAlanEmber.rank, 3)
  const without = { [theTowerMind.slug]: theTowerMind.title }
  expect(attunementsIn([row], without, RANKS)).toEqual([])
})

test("a row whose rank names no title is left out", () => {
  const row = rowOf(theTowerAlanEmber.element, theTowerAlanEmber.rank, 3)
  const without = { [theTowerSoul.slug]: theTowerSoul.title }
  expect(attunementsIn([row], ELEMENTS, without)).toEqual([])
})

test("a row whose counter is no number is left out", () => {
  const row = rowOf(theTowerAlanEmber.element, theTowerAlanEmber.rank, "9")
  expect(attunementsIn([row], ELEMENTS, RANKS)).toEqual([])
})

test("the attunements come back in the order their names sort", () => {
  expect(attunementsIn([FORCE, EMBER], ELEMENTS, RANKS)).toEqual([
    { name: "Ember Manipulation", value: theTowerAlanEmber.counter },
    { name: "Force Affinity", value: theTowerAlanForce.counter },
  ])
})

test("no row at all answers no attunement", () => {
  expect(attunementsIn([], ELEMENTS, RANKS)).toEqual([])
})
