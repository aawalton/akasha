import { expect, test } from "bun:test"
import {
  advance,
  ladderOf,
  rankNamed,
} from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/skills/modules/advance/tower-skill-advance.module.code.ts"
import { theTowerApprentice } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/skills/ranks/pages/the-tower-apprentice.tower-skill-rank.ts"
import { theTowerExpert } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/skills/ranks/pages/the-tower-expert.tower-skill-rank.ts"
import { theTowerGrandmaster } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/skills/ranks/pages/the-tower-grandmaster.tower-skill-rank.ts"
import { theTowerJourneyman } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/skills/ranks/pages/the-tower-journeyman.tower-skill-rank.ts"
import { theTowerMaster } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/skills/ranks/pages/the-tower-master.tower-skill-rank.ts"
import { theTowerNovice } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/skills/ranks/pages/the-tower-novice.tower-skill-rank.ts"
import { theTowerSage } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/skills/ranks/pages/the-tower-sage.tower-skill-rank.ts"

const RANKS = [
  theTowerSage,
  theTowerMaster,
  theTowerNovice,
  theTowerGrandmaster,
  theTowerApprentice,
  theTowerExpert,
  theTowerJourneyman,
]

const NOVICE = rankNamed(theTowerNovice.slug)
const APPRENTICE = rankNamed(theTowerApprentice.slug)
const JOURNEYMAN = rankNamed(theTowerJourneyman.slug)
const EXPERT = rankNamed(theTowerExpert.slug)
const MASTER = rankNamed(theTowerMaster.slug)
const SAGE = rankNamed(theTowerSage.slug)
const UNNAMED = rankNamed("kindled")

const EMBER = { rank: APPRENTICE, level: 9, demonstrations: 0, shown: JOURNEYMAN }

test("the ranks climb in the order their widths rise, and the rank with no width tops them", () => {
  expect(ladderOf(RANKS).map((one) => one.slug)).toEqual([
    theTowerNovice.slug,
    theTowerApprentice.slug,
    theTowerJourneyman.slug,
    theTowerExpert.slug,
    theTowerMaster.slug,
    theTowerGrandmaster.slug,
    theTowerSage.slug,
  ])
})

test("a skill holds one short of promotion until both demonstrations land", () => {
  expect(advance(RANKS, EMBER)).toEqual({
    answered: { rank: APPRENTICE, level: 9, demonstrations: 1, gained: 0, promoted: false },
  })
})

test("the second demonstration lifts the clamp and promotes", () => {
  expect(advance(RANKS, { ...EMBER, demonstrations: 1 })).toEqual({
    answered: { rank: JOURNEYMAN, level: 1, demonstrations: 0, gained: 1, promoted: true },
  })
})

test("a use rolls the level halfway to the rank's width", () => {
  expect(advance(RANKS, { rank: NOVICE, level: 1, demonstrations: 0, shown: NOVICE })).toEqual({
    answered: { rank: NOVICE, level: 3, demonstrations: 0, gained: 2, promoted: false },
  })
})

test("a use below the rank the skill holds advances nothing", () => {
  expect(advance(RANKS, { rank: EXPERT, level: 10, demonstrations: 2, shown: APPRENTICE })).toEqual(
    {
      answered: { rank: EXPERT, level: 10, demonstrations: 2, gained: 0, promoted: false },
    }
  )
})

test("entering apprentice takes one demonstration, and entering master four", () => {
  expect(advance(RANKS, { rank: NOVICE, level: 4, demonstrations: 0, shown: APPRENTICE })).toEqual({
    answered: { rank: APPRENTICE, level: 1, demonstrations: 0, gained: 1, promoted: true },
  })
  expect(advance(RANKS, { rank: EXPERT, level: 49, demonstrations: 0, shown: MASTER })).toEqual({
    answered: { rank: EXPERT, level: 49, demonstrations: 1, gained: 0, promoted: false },
  })
})

test("a skill at the top rank rises one level a use", () => {
  expect(advance(RANKS, { rank: SAGE, level: 12, demonstrations: 0, shown: SAGE })).toEqual({
    answered: { rank: SAGE, level: 13, demonstrations: 0, gained: 1, promoted: false },
  })
})

test("a rank no rank page names is refused", () => {
  expect(advance(RANKS, { ...EMBER, rank: UNNAMED })).toHaveProperty("refused")
  expect(advance(RANKS, { ...EMBER, shown: UNNAMED })).toHaveProperty("refused")
})
