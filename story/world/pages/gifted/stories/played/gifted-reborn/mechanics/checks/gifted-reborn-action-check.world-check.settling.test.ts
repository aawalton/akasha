import { expect, test } from "bun:test"
import { characterPlayer } from "akasha/story/world/characters/character-player/character-player.page-type.ts"
import { actionDifficulty } from "akasha/story/world/mechanics/checks/action-difficulties/action-difficulty.page-type.ts"
import { medium } from "akasha/story/world/mechanics/checks/action-difficulties/pages/medium.action-difficulty.ts"
import { metricCharacterStat } from "akasha/story/world/mechanics/metrics/metric-character/attribute/stat/metric-character-stat.page-type.ts"
import { characterSkill } from "akasha/story/world/mechanics/skills/character-skill/character-skill.page-type.ts"
import { giftedPathOfEndurance } from "akasha/story/world/pages/gifted/mechanics/skills/gifted-path-of-endurance.world-skill.ts"
import { giftedRebornNala } from "akasha/story/world/pages/gifted/stories/played/gifted-reborn/characters/gifted-reborn-nala.character-player.ts"
import { settled } from "akasha/story/world/pages/gifted/stories/played/gifted-reborn/mechanics/checks/gifted-reborn-action-check.world-check.settling.code.ts"
import { giftedRebornNalaMental } from "akasha/story/world/pages/gifted/stories/played/gifted-reborn/mechanics/metrics/stats/gifted-reborn-nala-mental.metric-character-stat.ts"
import { giftedRebornNalaShadow } from "akasha/story/world/pages/gifted/stories/played/gifted-reborn/mechanics/metrics/stats/gifted-reborn-nala-shadow.metric-character-stat.ts"
import { giftedRebornNalaPathOfEndurance } from "akasha/story/world/pages/gifted/stories/played/gifted-reborn/mechanics/skills-held/gifted-reborn-nala-path-of-endurance.character-skill.ts"
import { giftedRebornNalaPathOfTheCompletionist } from "akasha/story/world/pages/gifted/stories/played/gifted-reborn/mechanics/skills-held/gifted-reborn-nala-path-of-the-completionist.character-skill.ts"

const EVEN = { total: 92, crit: false, fumble: false }

const ACT = {
  character: `${characterPlayer.slug}/${giftedRebornNala.slug}`,
  actionDifficulty: `${actionDifficulty.slug}/${medium.slug}`,
}

const BASIC_TIERS = [10, 25, 50, 100, 250, 500, 1000, 2500, 5000, 10000]

test("a Basic Path adds five for each Tier passed, under the Path's name", () => {
  const act = { ...ACT, skill: `${characterSkill.slug}/${giftedRebornNalaPathOfEndurance.slug}` }
  const passed = BASIC_TIERS.filter((one) => giftedRebornNalaPathOfEndurance.experience >= one)
  const by = passed.length * 5
  expect(settled(act, EVEN)).toMatchObject({
    answered: { score: by, terms: [{ from: giftedPathOfEndurance.title, by }] },
  })
})

test("a Basic Attribute alone adds half of what it is over a hundred", () => {
  const act = { ...ACT, stat: `${metricCharacterStat.slug}/${giftedRebornNalaMental.slug}` }
  const by = Math.floor((giftedRebornNalaMental.value - 100) / 2)
  expect(settled(act, EVEN)).toMatchObject({
    answered: { score: by, terms: [{ from: "Mental", by }] },
  })
})

test("an Elite Path is no craft an act names", () => {
  const elite = `${characterSkill.slug}/${giftedRebornNalaPathOfTheCompletionist.slug}`
  expect(settled({ ...ACT, skill: elite }, EVEN)).toHaveProperty("refused")
})

test("an Attribute that is not Basic is refused", () => {
  const shadow = `${metricCharacterStat.slug}/${giftedRebornNalaShadow.slug}`
  expect(settled({ ...ACT, stat: shadow }, EVEN)).toHaveProperty("refused")
})
