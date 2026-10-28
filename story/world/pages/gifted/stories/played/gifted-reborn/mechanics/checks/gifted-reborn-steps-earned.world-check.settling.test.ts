import { expect, test } from "bun:test"
import { characterSkill } from "akasha/story/world/mechanics/skills/character-skill/character-skill.page-type.ts"
import { giftedUnallocatedStats } from "akasha/story/world/pages/gifted/mechanics/metrics/resources/unallocated-stats/gifted-unallocated-stats.page-type.ts"
import { giftedPathOfEndurance } from "akasha/story/world/pages/gifted/mechanics/skills/gifted-path-of-endurance.world-skill.ts"
import {
  added,
  settled,
} from "akasha/story/world/pages/gifted/stories/played/gifted-reborn/mechanics/checks/gifted-reborn-steps-earned.world-check.settling.code.ts"
import { giftedRebornNala as nalaUnallocatedStats } from "akasha/story/world/pages/gifted/stories/played/gifted-reborn/mechanics/metrics/points/gifted-reborn-nala.gifted-unallocated-stats.ts"
import { giftedRebornNalaPathOfEndurance } from "akasha/story/world/pages/gifted/stories/played/gifted-reborn/mechanics/skills-held/gifted-reborn-nala-path-of-endurance.character-skill.ts"
import { giftedRebornNalaPathOfSoulstealing } from "akasha/story/world/pages/gifted/stories/played/gifted-reborn/mechanics/skills-held/gifted-reborn-nala-path-of-soulstealing.character-skill.ts"
import { giftedRebornNalaPathOfTheCompletionist } from "akasha/story/world/pages/gifted/stories/played/gifted-reborn/mechanics/skills-held/gifted-reborn-nala-path-of-the-completionist.character-skill.ts"
import { giftedRebornNalaPathOfWillpower } from "akasha/story/world/pages/gifted/stories/played/gifted-reborn/mechanics/skills-held/gifted-reborn-nala-path-of-willpower.character-skill.ts"

const ENDURANCE = `${characterSkill.slug}/${giftedRebornNalaPathOfEndurance.slug}`

const WILLPOWER = `${characterSkill.slug}/${giftedRebornNalaPathOfWillpower.slug}`

const SOULSTEALING = `${characterSkill.slug}/${giftedRebornNalaPathOfSoulstealing.slug}`

const COMPLETIONIST = `${characterSkill.slug}/${giftedRebornNalaPathOfTheCompletionist.slug}`

const STATS = `${giftedUnallocatedStats.slug}/${nalaUnallocatedStats.slug}`

const ROLL = { total: 3, crit: false, fumble: false }

test("Talented 109 turns an Achievement's 1000 steps into 1218, as Survive a Fatal Blow paid", () => {
  const reading = {
    earned: [{ path: ENDURANCE, experience: 49, achievement: { basic: 1000 } }],
    talented: 109,
  }
  const said = settled(reading, null)
  expect(said).toEqual({
    answered: {
      earned: [
        {
          path: ENDURANCE,
          gained: 1218,
          experience: 1267,
          tier: 7,
          crossed: [3, 4, 5, 6, 7].map((tier) => `${giftedPathOfEndurance.title} Tier ${tier}`),
        },
      ],
    },
  })
  if (!("answered" in said)) return
  expect(added(reading, said.answered)).toEqual([
    { page: ENDURANCE, key: "experience", by: 1218 },
    { page: giftedRebornNalaPathOfEndurance.attribute, key: "value", by: 5 },
  ])
})

test("Gifted speeds by two fifths of its value and falls to the whole step below", () => {
  const sixty = { earned: [{ path: WILLPOWER, experience: 0, achievement: { basic: 1000 } }] }
  expect(settled({ ...sixty, gifted: 150 }, null)).toMatchObject({
    answered: { earned: [{ gained: 1600 }] },
  })
  const deed = { earned: [{ path: WILLPOWER, experience: 0, deed: 100 }] }
  expect(settled({ ...deed, gifted: 159 }, null)).toMatchObject({
    answered: { earned: [{ gained: 163 }] },
  })
  expect(settled({ ...deed, gifted: 187 }, null)).toMatchObject({
    answered: { earned: [{ gained: 174 }] },
  })
})

test("an Achievement pays the steps it offers the chosen Path's kind, and no other kind", () => {
  const offered = { path: WILLPOWER, experience: 0, achievement: { advanced: 100 } }
  expect(settled({ earned: [offered] }, null)).toHaveProperty("refused")
  const either = { ...offered, achievement: { basic: 1000, advanced: 100 } }
  expect(settled({ earned: [either] }, null)).toMatchObject({
    answered: { earned: [{ gained: 1000 }] },
  })
})

test("a mutated Path takes a deed's steps and refuses an Achievement's", () => {
  const deed = { earned: [{ path: SOULSTEALING, experience: 0, deed: 1 }] }
  expect(settled(deed, null)).toMatchObject({ answered: { earned: [{ gained: 1, tier: 0 }] } })
  const achievement = { path: SOULSTEALING, experience: 0, achievement: { basic: 1000 } }
  expect(settled({ earned: [achievement] }, null)).toHaveProperty("refused")
})

test("the Completionist's first Tier pays 2 Unallocated Stats", () => {
  const reading = { earned: [{ path: COMPLETIONIST, experience: 0, deed: 1 }] }
  const said = settled(reading, null)
  if (!("answered" in said)) throw new Error("the Completionist was refused a deed")
  expect(added(reading, said.answered)).toEqual([
    { page: COMPLETIONIST, key: "experience", by: 1 },
    { page: STATS, key: "value", by: 2 },
  ])
})

test("several Paths settle at once, each named once", () => {
  const reading = {
    earned: [
      { path: SOULSTEALING, experience: 0, deed: 2 },
      { path: ENDURANCE, experience: 0, deed: 12 },
    ],
  }
  const said = settled(reading, null)
  if (!("answered" in said)) throw new Error("two Paths were refused")
  expect(added(reading, said.answered)).toEqual([
    { page: SOULSTEALING, key: "experience", by: 2 },
    { page: ENDURANCE, key: "experience", by: 12 },
    { page: giftedRebornNalaPathOfEndurance.attribute, key: "value", by: 1 },
  ])
  const twice = { earned: [reading.earned[1], reading.earned[1]] }
  expect(settled(twice, null)).toHaveProperty("refused")
})

test("an entry stating both a deed and an Achievement, or a roll, is refused", () => {
  const both = { path: ENDURANCE, experience: 0, deed: 3, achievement: { basic: 1000 } }
  expect(settled({ earned: [both] }, null)).toHaveProperty("refused")
  const deed = { earned: [{ path: ENDURANCE, experience: 0, deed: 3 }] }
  expect(settled(deed, ROLL)).toHaveProperty("refused")
})
