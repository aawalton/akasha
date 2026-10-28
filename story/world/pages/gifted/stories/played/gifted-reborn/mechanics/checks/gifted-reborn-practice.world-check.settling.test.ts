import { expect, test } from "bun:test"
import { characterSkill } from "akasha/story/world/mechanics/skills/character-skill/character-skill.page-type.ts"
import { giftedPathOfBasicNumeracy } from "akasha/story/world/pages/gifted/mechanics/skills/gifted-path-of-basic-numeracy.world-skill.ts"
import {
  added,
  next,
  settled,
} from "akasha/story/world/pages/gifted/stories/played/gifted-reborn/mechanics/checks/gifted-reborn-practice.world-check.settling.code.ts"
import { giftedRebornNalaPathOfBasicNumeracy } from "akasha/story/world/pages/gifted/stories/played/gifted-reborn/mechanics/skills-held/gifted-reborn-nala-path-of-basic-numeracy.character-skill.ts"
import { giftedRebornNalaPathOfEndurance } from "akasha/story/world/pages/gifted/stories/played/gifted-reborn/mechanics/skills-held/gifted-reborn-nala-path-of-endurance.character-skill.ts"
import { giftedRebornNalaPathOfTheCompletionist } from "akasha/story/world/pages/gifted/stories/played/gifted-reborn/mechanics/skills-held/gifted-reborn-nala-path-of-the-completionist.character-skill.ts"

const NUMERACY = `${characterSkill.slug}/${giftedRebornNalaPathOfBasicNumeracy.slug}`

const ENDURANCE = `${characterSkill.slug}/${giftedRebornNalaPathOfEndurance.slug}`

const ROLL = { total: 3, crit: false, fumble: false }

test("a Path known from her past life earns the die and two, and a Tier adds a point", () => {
  const reading = { path: NUMERACY, experience: 8 }
  const said = settled(reading, ROLL)
  expect(said).toEqual({ answered: { gained: 5, experience: 13, tier: 1 } })
  if (!("answered" in said)) return
  expect(added(reading, said.answered)).toEqual([
    { page: NUMERACY, key: "experience", by: 5 },
    { page: giftedRebornNalaPathOfBasicNumeracy.attribute, key: "value", by: 1 },
  ])
  expect(next(reading, said.answered)).toEqual({
    reading: { ...reading, experience: 13 },
    crossed: [`${giftedPathOfBasicNumeracy.title} Tier 1`],
    left: null,
  })
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
