import { expect, test } from "bun:test"
import { characterPlayer } from "akasha/story/world/characters/character-player/character-player.page-type.ts"
import { actionDifficulty } from "akasha/story/world/mechanics/checks/action-difficulties/action-difficulty.page-type.ts"
import { medium } from "akasha/story/world/mechanics/checks/action-difficulties/pages/medium.action-difficulty.ts"
import { metricCharacterStat } from "akasha/story/world/mechanics/metrics/metric-character/attribute/stat/metric-character-stat.page-type.ts"
import { characterSkill } from "akasha/story/world/mechanics/skills/character-skill/character-skill.page-type.ts"
import { testWorldSwordplay } from "akasha/story/world/pages/test-world/mechanics/skills/test-world-swordplay.world-skill.ts"
import { testStoryPlayer } from "akasha/story/world/pages/test-world/stories/played/test-story/characters/test-story-player.character-player.ts"
import { settled } from "akasha/story/world/pages/test-world/stories/played/test-story/mechanics/checks/test-story-action-check.world-check.settling.code.ts"
import { testStoryPlayerAgility } from "akasha/story/world/pages/test-world/stories/played/test-story/mechanics/metrics/stats/test-story-player-agility.metric-character-stat.ts"
import { testStoryPlayerSwordplay } from "akasha/story/world/pages/test-world/stories/played/test-story/mechanics/skills-held/test-story-player-swordplay.character-skill.ts"

const EVEN = { total: 92, crit: false, fumble: false }

const ACT = {
  character: `${characterPlayer.slug}/${testStoryPlayer.slug}`,
  actionDifficulty: `${actionDifficulty.slug}/${medium.slug}`,
}

test("a held skill adds its experience, up to fifty, under the skill's own name", () => {
  const act = { ...ACT, skill: `${characterSkill.slug}/${testStoryPlayerSwordplay.slug}` }
  const by = Math.min(testStoryPlayerSwordplay.experience, 50)
  expect(settled(act, EVEN)).toMatchObject({
    answered: { score: by, terms: [{ from: testWorldSwordplay.title, by }] },
  })
})

test("a stat alone adds three for each point over ten", () => {
  const act = { ...ACT, stat: `${metricCharacterStat.slug}/${testStoryPlayerAgility.slug}` }
  const by = (testStoryPlayerAgility.value - 10) * 3
  expect(settled(act, EVEN)).toMatchObject({
    answered: { score: by, terms: [{ from: "Agility", by }] },
  })
})

test("a skill the player character does not hold is refused, naming those held", () => {
  const said = settled({ ...ACT, skill: `${characterSkill.slug}/archery` }, EVEN)
  expect("refused" in said ? said.refused : "").toContain(testStoryPlayerSwordplay.slug)
})

test("an act read the old banded way is refused", () => {
  expect(settled({ band: "standard" }, EVEN)).toHaveProperty("refused")
})
