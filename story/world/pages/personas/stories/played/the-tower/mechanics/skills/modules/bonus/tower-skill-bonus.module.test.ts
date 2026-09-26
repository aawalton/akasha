import { expect, test } from "bun:test"
import { rankNamed } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/skills/modules/advance/tower-skill-advance.module.code.ts"
import { bonusOf } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/skills/modules/bonus/tower-skill-bonus.module.code.ts"
import { theTowerApprentice } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/skills/ranks/pages/the-tower-apprentice.tower-skill-rank.ts"
import { theTowerExpert } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/skills/ranks/pages/the-tower-expert.tower-skill-rank.ts"
import { theTowerGrandmaster } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/skills/ranks/pages/the-tower-grandmaster.tower-skill-rank.ts"
import { theTowerJourneyman } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/skills/ranks/pages/the-tower-journeyman.tower-skill-rank.ts"
import { theTowerMaster } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/skills/ranks/pages/the-tower-master.tower-skill-rank.ts"
import { theTowerNovice } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/skills/ranks/pages/the-tower-novice.tower-skill-rank.ts"
import { theTowerSage } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/skills/ranks/pages/the-tower-sage.tower-skill-rank.ts"

const RANKS = [
  theTowerNovice,
  theTowerApprentice,
  theTowerJourneyman,
  theTowerExpert,
  theTowerMaster,
  theTowerGrandmaster,
  theTowerSage,
]

test("a skill adds by its rank, and the bonus names the skill it came from", () => {
  const rank = rankNamed(theTowerJourneyman.slug)
  expect(bonusOf(RANKS, { skill: "Ember Channel", rank })).toEqual({
    answered: { from: "Ember Channel", by: 2 },
  })
})

test("a novice adds nothing and a sage adds six", () => {
  expect(bonusOf(RANKS, { skill: "Smithing", rank: rankNamed(theTowerNovice.slug) })).toEqual({
    answered: { from: "Smithing", by: 0 },
  })
  expect(bonusOf(RANKS, { skill: "Smithing", rank: rankNamed(theTowerSage.slug) })).toEqual({
    answered: { from: "Smithing", by: 6 },
  })
})

test("a rank no rank page names is refused", () => {
  expect(bonusOf(RANKS, { skill: "Smithing", rank: rankNamed("kindled") })).toHaveProperty(
    "refused"
  )
})
