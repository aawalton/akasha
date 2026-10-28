import { expect, test } from "bun:test"
import { characterPlayer } from "akasha/story/world/characters/character-player/character-player.page-type.ts"
import { actionDifficulty } from "akasha/story/world/mechanics/checks/action-difficulties/action-difficulty.page-type.ts"
import { medium } from "akasha/story/world/mechanics/checks/action-difficulties/pages/medium.action-difficulty.ts"
import { metricCharacterStat } from "akasha/story/world/mechanics/metrics/metric-character/attribute/stat/metric-character-stat.page-type.ts"
import { characterSkill } from "akasha/story/world/mechanics/skills/character-skill/character-skill.page-type.ts"
import { worldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.ts"
import { giftedPathOfEndurance } from "akasha/story/world/pages/gifted/mechanics/skills/gifted-path-of-endurance.world-skill.ts"
import { giftedPathOfExceptionalism } from "akasha/story/world/pages/gifted/mechanics/skills/gifted-path-of-exceptionalism.world-skill.ts"
import { giftedPathOfTheCompletionist } from "akasha/story/world/pages/gifted/mechanics/skills/gifted-path-of-the-completionist.world-skill.ts"
import { giftedRebornNala } from "akasha/story/world/pages/gifted/stories/played/gifted-reborn/characters/gifted-reborn-nala.character-player.ts"
import { settled } from "akasha/story/world/pages/gifted/stories/played/gifted-reborn/mechanics/checks/gifted-reborn-action-check.world-check.settling.code.ts"
import { giftedRebornNalaMental } from "akasha/story/world/pages/gifted/stories/played/gifted-reborn/mechanics/metrics/stats/gifted-reborn-nala-mental.metric-character-stat.ts"
import { giftedRebornNalaShadow } from "akasha/story/world/pages/gifted/stories/played/gifted-reborn/mechanics/metrics/stats/gifted-reborn-nala-shadow.metric-character-stat.ts"

const EVEN = { total: 92, crit: false, fumble: false }

const NALA = `${characterPlayer.slug}/${giftedRebornNala.slug}`

const ACT = { character: NALA, actionDifficulty: `${actionDifficulty.slug}/${medium.slug}` }

const PATHS = [giftedPathOfEndurance, giftedPathOfTheCompletionist, giftedPathOfExceptionalism]

const HELD = "gifted-reborn-nala-a-path"

const WALKED = { ...ACT, skill: `${characterSkill.slug}/${HELD}` }

function holding(path: (typeof PATHS)[number], experience: number, unrevealed = false) {
  const value = {
    character: NALA,
    skill: `${worldSkill.slug}/${path.slug}`,
    experience,
    unrevealed,
  }
  return {
    skillsOf: (character: string) => (character === NALA ? [{ slug: HELD, value }] : []),
    pathOf: (skill: string) => {
      const found = PATHS.find((one) => `${worldSkill.slug}/${one.slug}` === skill)
      return found === undefined ? null : { title: found.title, tierSteps: found.tierSteps }
    },
  }
}

test("a Basic Path adds five for each Tier passed, under the Path's name", () => {
  expect(settled(WALKED, EVEN, holding(giftedPathOfEndurance, 60))).toMatchObject({
    answered: { score: 15, terms: [{ from: giftedPathOfEndurance.title, by: 15 }] },
  })
})

test("an Advanced Path adds ten for each Tier passed, read off its world skill's Tiers", () => {
  const title = giftedPathOfTheCompletionist.title
  expect(settled(WALKED, EVEN, holding(giftedPathOfTheCompletionist, 9))).toMatchObject({
    answered: { score: 0, terms: [{ from: title, by: 0 }] },
  })
  expect(settled(WALKED, EVEN, holding(giftedPathOfTheCompletionist, 60))).toMatchObject({
    answered: { score: 20, terms: [{ from: title, by: 20 }] },
  })
  expect(settled(WALKED, EVEN, holding(giftedPathOfTheCompletionist, 1000))).toMatchObject({
    answered: { score: 50, terms: [{ from: title, by: 50 }] },
  })
})

test("a Path not yet opened is no craft an act names", () => {
  expect(settled(WALKED, EVEN, holding(giftedPathOfEndurance, 60, true))).toHaveProperty("refused")
})

test("a Basic Attribute alone adds half of what it is over a hundred", () => {
  const act = { ...ACT, stat: `${metricCharacterStat.slug}/${giftedRebornNalaMental.slug}` }
  const by = Math.floor((giftedRebornNalaMental.value - 100) / 2)
  expect(settled(act, EVEN)).toMatchObject({
    answered: { score: by, terms: [{ from: "Mental", by }] },
  })
})

test("an Elite Path is no craft an act names", () => {
  expect(settled(WALKED, EVEN, holding(giftedPathOfExceptionalism, 600))).toHaveProperty("refused")
})

test("an Attribute that is not Basic is refused", () => {
  const shadow = `${metricCharacterStat.slug}/${giftedRebornNalaShadow.slug}`
  expect(settled({ ...ACT, stat: shadow }, EVEN)).toHaveProperty("refused")
})
