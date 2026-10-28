import { expect, test } from "bun:test"
import { characterSkill } from "akasha/story/world/mechanics/skills/character-skill/character-skill.page-type.ts"
import { giftedUnallocatedStats } from "akasha/story/world/pages/gifted/mechanics/metrics/resources/unallocated-stats/gifted-unallocated-stats.page-type.ts"
import { giftedPathOfBasicNumeracy } from "akasha/story/world/pages/gifted/mechanics/skills/gifted-path-of-basic-numeracy.world-skill.ts"
import {
  added,
  next,
  settled,
} from "akasha/story/world/pages/gifted/stories/played/gifted-reborn/mechanics/checks/gifted-reborn-practice.world-check.settling.code.ts"
import { giftedRebornNala as nalaUnallocatedStats } from "akasha/story/world/pages/gifted/stories/played/gifted-reborn/mechanics/metrics/points/gifted-reborn-nala.gifted-unallocated-stats.ts"
import { giftedRebornNalaPathOfBasicNumeracy } from "akasha/story/world/pages/gifted/stories/played/gifted-reborn/mechanics/skills-held/gifted-reborn-nala-path-of-basic-numeracy.character-skill.ts"
import { giftedRebornNalaPathOfEndurance } from "akasha/story/world/pages/gifted/stories/played/gifted-reborn/mechanics/skills-held/gifted-reborn-nala-path-of-endurance.character-skill.ts"
import { giftedRebornNalaPathOfTheCompletionist } from "akasha/story/world/pages/gifted/stories/played/gifted-reborn/mechanics/skills-held/gifted-reborn-nala-path-of-the-completionist.character-skill.ts"

const NUMERACY = `${characterSkill.slug}/${giftedRebornNalaPathOfBasicNumeracy.slug}`

const ENDURANCE = `${characterSkill.slug}/${giftedRebornNalaPathOfEndurance.slug}`

const ROLL = { total: 3, crit: false, fumble: false }

const STATS = `${giftedUnallocatedStats.slug}/${nalaUnallocatedStats.slug}`

test("a Path known from her past life earns the die and three, and a Tier adds a point", () => {
  const reading = { path: NUMERACY, experience: 8 }
  const said = settled(reading, ROLL)
  expect(said).toEqual({ answered: { gained: 6, experience: 14, tier: 1 } })
  if (!("answered" in said)) return
  expect(added(reading, said.answered)).toEqual([
    { page: NUMERACY, key: "experience", by: 6 },
    { page: giftedRebornNalaPathOfBasicNumeracy.attribute, key: "value", by: 1 },
  ])
  expect(next(reading, said.answered)).toEqual({
    reading: { ...reading, experience: 14 },
    crossed: [`${giftedPathOfBasicNumeracy.title} Tier 1`],
    left: null,
  })
})

test("Talented speeds a session by a fifth of its value in percent, to the nearest step", () => {
  const reading = { path: ENDURANCE, experience: 0, talented: 100 }
  expect(settled(reading, ROLL)).toEqual({ answered: { gained: 4, experience: 4, tier: 0 } })
  const said = settled(reading, ROLL)
  if (!("answered" in said)) return
  expect(next(reading, said.answered).reading).toEqual({ ...reading, experience: 4 })
})

test("Gifted speeds a session by two fifths of its value in percent", () => {
  const reading = { path: ENDURANCE, experience: 0, gifted: 150 }
  expect(settled(reading, ROLL)).toEqual({ answered: { gained: 5, experience: 5, tier: 0 } })
})

test("a reading stating both Talented and Gifted is refused", () => {
  const reading = { path: ENDURANCE, experience: 0, talented: 100, gifted: 150 }
  expect(settled(reading, ROLL)).toHaveProperty("refused")
})

test("a Basic Path's ninth Tier pays an Unallocated Stat and its tenth two, with no point", () => {
  const ninth = { path: NUMERACY, experience: 4995 }
  const nine = settled(ninth, ROLL)
  expect(nine).toEqual({ answered: { gained: 6, experience: 5001, tier: 9 } })
  if (!("answered" in nine)) return
  expect(added(ninth, nine.answered)).toEqual([
    { page: NUMERACY, key: "experience", by: 6 },
    { page: STATS, key: "value", by: 1 },
  ])
  const tenth = { path: NUMERACY, experience: 9995 }
  const ten = settled(tenth, ROLL)
  if (!("answered" in ten)) return
  expect(added(tenth, ten.answered)).toEqual([
    { page: NUMERACY, key: "experience", by: 6 },
    { page: STATS, key: "value", by: 2 },
  ])
})

test("a session handed no roll is refused", () => {
  expect(settled({ path: ENDURANCE, experience: 0 }, null)).toHaveProperty("refused")
})

test("a Path new to her earns the die alone, and no Tier adds nothing more", () => {
  const reading = { path: ENDURANCE, experience: 0 }
  const said = settled(reading, ROLL)
  expect(said).toEqual({ answered: { gained: 3, experience: 3, tier: 0 } })
  if (!("answered" in said)) return
  expect(added(reading, said.answered)).toEqual([{ page: ENDURANCE, key: "experience", by: 3 }])
  expect(next(reading, said.answered).crossed).toEqual([])
})

test("a Path that is not a Basic Path she holds is refused", () => {
  const elite = `${characterSkill.slug}/${giftedRebornNalaPathOfTheCompletionist.slug}`
  expect(settled({ path: elite, experience: 0 }, ROLL)).toHaveProperty("refused")
})
