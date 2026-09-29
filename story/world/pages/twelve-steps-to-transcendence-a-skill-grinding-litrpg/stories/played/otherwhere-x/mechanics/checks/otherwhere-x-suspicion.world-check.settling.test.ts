import { expect, test } from "bun:test"
import {
  added,
  settled,
} from "akasha/story/world/pages/twelve-steps-to-transcendence-a-skill-grinding-litrpg/stories/played/otherwhere-x/mechanics/checks/otherwhere-x-suspicion.world-check.settling.code.ts"
import { otherwhereXSuspicion } from "akasha/story/world/pages/twelve-steps-to-transcendence-a-skill-grinding-litrpg/stories/played/otherwhere-x/mechanics/metrics/attributes/suspicion/otherwhere-x-suspicion.page-type.ts"
import { otherwhereXNala } from "akasha/story/world/pages/twelve-steps-to-transcendence-a-skill-grinding-litrpg/stories/played/otherwhere-x/mechanics/metrics/attributes/suspicion/pages/otherwhere-x-nala.otherwhere-x-suspicion.ts"

const NALA = { character: "otherwhere-x-nala" }

test("a barefoot stranger with no token and no home is questioned", () => {
  expect(
    settled({
      ...NALA,
      suspicion: 0,
      marks: { noToken: true, strangeClothes: true, noHome: true },
    })
  ).toEqual({
    answered: { raised: 4, eased: 0, change: 4, suspicion: 4, stance: "questioned" },
  })
})

test("wearing a drowned woman's face on the day of the surge gets her held", () => {
  expect(
    settled({
      ...NALA,
      suspicion: 4,
      marks: { deadFace: true, nearTheSurge: true, aloneAndCalm: true, noToken: true },
    })
  ).toHaveProperty("answered.stance", "held")
})

test("a song in a tongue no one in the Plains speaks raises two", () => {
  expect(settled({ ...NALA, suspicion: 1, marks: { unknownTongue: true } })).toEqual({
    answered: { raised: 2, eased: 0, change: 2, suspicion: 3, stance: "questioned" },
  })
})

test("a neighbour's word and a day's honest work ease suspicion", () => {
  expect(
    settled({ ...NALA, suspicion: 5, eased: { vouched: true, honestWork: true } })
  ).toHaveProperty("answered.suspicion", 2)
})

test("a cleared tablet reading ends suspicion", () => {
  expect(
    settled({ ...NALA, suspicion: 13, marks: { noToken: true }, tabletCleared: true })
  ).toEqual({
    answered: { raised: 2, eased: 0, change: -13, suspicion: 0, stance: "unremarked" },
  })
})

test("refusing the tablet runs past held to seized", () => {
  expect(settled({ ...NALA, suspicion: 9, marks: { refusedTablet: true } })).toHaveProperty(
    "answered.stance",
    "seized"
  )
})

test("suspicion never falls below nought", () => {
  expect(
    settled({ ...NALA, suspicion: 1, eased: { roadToken: true, vouched: true } })
  ).toHaveProperty("answered.suspicion", 0)
})

test("an unknown mark is refused", () => {
  expect(settled({ ...NALA, suspicion: 0, marks: { witchcraft: true } })).toHaveProperty("refused")
})

test("the change is added to her suspicion page", () => {
  const reading = { ...NALA, suspicion: 0, marks: { noToken: true } }
  const answered = settled(reading)
  expect(added(reading, "answered" in answered ? answered.answered : null)).toEqual([
    { page: `${otherwhereXSuspicion.slug}/${otherwhereXNala.slug}`, key: "value", by: 2 },
  ])
})
