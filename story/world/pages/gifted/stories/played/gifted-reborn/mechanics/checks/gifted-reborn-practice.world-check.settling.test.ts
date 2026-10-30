import { expect, test } from "bun:test"
import { characterPlayer } from "akasha/story/world/characters/character-player/character-player.page-type.ts"
import { metricCharacterStat } from "akasha/story/world/mechanics/metrics/metric-character/attribute/stat/metric-character-stat.page-type.ts"
import type { HeldPath } from "akasha/story/world/mechanics/modules/gifted-path-stepping/gifted-path-stepping.module.code.ts"
import {
  heldAs,
  reachOver,
} from "akasha/story/world/mechanics/modules/gifted-path-stepping/gifted-path-stepping.module.test-fixtures.ts"
import { characterSkill } from "akasha/story/world/mechanics/skills/character-skill/character-skill.page-type.ts"
import { giftedUnallocatedStats } from "akasha/story/world/pages/gifted/mechanics/metrics/resources/unallocated-stats/gifted-unallocated-stats.page-type.ts"
import { giftedPathOfBasicNumeracy } from "akasha/story/world/pages/gifted/mechanics/skills/gifted-path-of-basic-numeracy.world-skill.ts"
import { giftedPathOfEavesdropping } from "akasha/story/world/pages/gifted/mechanics/skills/gifted-path-of-eavesdropping.world-skill.ts"
import { giftedPathOfEndurance } from "akasha/story/world/pages/gifted/mechanics/skills/gifted-path-of-endurance.world-skill.ts"
import { giftedPathOfLinguisticsEnglish } from "akasha/story/world/pages/gifted/mechanics/skills/gifted-path-of-linguistics-english.world-skill.ts"
import { giftedPathOfTheCompletionist } from "akasha/story/world/pages/gifted/mechanics/skills/gifted-path-of-the-completionist.world-skill.ts"
import { giftedPathOfWillpower } from "akasha/story/world/pages/gifted/mechanics/skills/gifted-path-of-willpower.world-skill.ts"
import { giftedRebornNala } from "akasha/story/world/pages/gifted/stories/played/gifted-reborn/characters/gifted-reborn-nala.character-player.ts"
import {
  added,
  next,
  settled,
} from "akasha/story/world/pages/gifted/stories/played/gifted-reborn/mechanics/checks/gifted-reborn-practice.world-check.settling.code.ts"
import { giftedRebornNala as nalaUnallocatedStats } from "akasha/story/world/pages/gifted/stories/played/gifted-reborn/mechanics/metrics/points/gifted-reborn-nala.gifted-unallocated-stats.ts"
import { giftedRebornNalaPathOfBasicNumeracy } from "akasha/story/world/pages/gifted/stories/played/gifted-reborn/mechanics/skills-held/gifted-reborn-nala-path-of-basic-numeracy.character-skill.ts"
import { giftedRebornNalaPathOfEavesdropping } from "akasha/story/world/pages/gifted/stories/played/gifted-reborn/mechanics/skills-held/gifted-reborn-nala-path-of-eavesdropping.character-skill.ts"
import { giftedRebornNalaPathOfEndurance } from "akasha/story/world/pages/gifted/stories/played/gifted-reborn/mechanics/skills-held/gifted-reborn-nala-path-of-endurance.character-skill.ts"
import { giftedRebornNalaPathOfLinguisticsEnglish } from "akasha/story/world/pages/gifted/stories/played/gifted-reborn/mechanics/skills-held/gifted-reborn-nala-path-of-linguistics-english.character-skill.ts"
import { giftedRebornNalaPathOfTheCompletionist } from "akasha/story/world/pages/gifted/stories/played/gifted-reborn/mechanics/skills-held/gifted-reborn-nala-path-of-the-completionist.character-skill.ts"
import { giftedRebornNalaPathOfWillpower } from "akasha/story/world/pages/gifted/stories/played/gifted-reborn/mechanics/skills-held/gifted-reborn-nala-path-of-willpower.character-skill.ts"

const NUMERACY = `${characterSkill.slug}/${giftedRebornNalaPathOfBasicNumeracy.slug}`

const ENDURANCE = `${characterSkill.slug}/${giftedRebornNalaPathOfEndurance.slug}`

const ROLL = { total: 3, crit: false, fumble: false }

const NALA = `${characterPlayer.slug}/${giftedRebornNala.slug}`

const STATS = `${giftedUnallocatedStats.slug}/${nalaUnallocatedStats.slug}`

const PROBE = `${characterPlayer.slug}/probe-nala`

const PROBE_STATS = `${giftedUnallocatedStats.slug}/probe-nala`

const PROBE_NUMERACY = `${characterSkill.slug}/probe-nala-path-of-basic-numeracy`

const PROBE_MENTAL = `${metricCharacterStat.slug}/probe-nala-mental`

const HELD: readonly HeldPath[] = [
  heldAs(giftedRebornNalaPathOfBasicNumeracy, giftedPathOfBasicNumeracy),
  heldAs(giftedRebornNalaPathOfEavesdropping, giftedPathOfEavesdropping),
  heldAs(giftedRebornNalaPathOfEndurance, giftedPathOfEndurance),
  heldAs(giftedRebornNalaPathOfLinguisticsEnglish, giftedPathOfLinguisticsEnglish),
  heldAs(giftedRebornNalaPathOfTheCompletionist, giftedPathOfTheCompletionist),
  heldAs(giftedRebornNalaPathOfWillpower, giftedPathOfWillpower),
  heldAs(
    { slug: "probe-nala-path-of-basic-numeracy", character: PROBE, attribute: PROBE_MENTAL },
    giftedPathOfBasicNumeracy
  ),
]

const REACH = reachOver(HELD, (character) => (character === NALA ? STATS : PROBE_STATS))

test("a Path known from her past life earns the die and three, and a Tier adds a point", () => {
  const reading = { path: NUMERACY, experience: 8 }
  const said = settled(reading, ROLL, REACH)
  expect(said).toEqual({ answered: { gained: 6, experience: 14, tier: 1 } })
  if (!("answered" in said)) return
  expect(added(reading, said.answered, REACH)).toEqual([
    { page: NUMERACY, key: "experience", by: 6 },
    { page: giftedRebornNalaPathOfBasicNumeracy.attribute, key: "value", by: 1 },
  ])
  expect(next(reading, said.answered, REACH)).toEqual({
    reading: { ...reading, experience: 14 },
    crossed: [`${giftedPathOfBasicNumeracy.title} Tier 1`],
    left: null,
  })
})

test("Talented speeds a session by a fifth of its value in percent, to the nearest step", () => {
  const reading = { path: ENDURANCE, experience: 0, talented: 100 }
  const said = settled(reading, ROLL, REACH)
  expect(said).toEqual({ answered: { gained: 4, experience: 4, tier: 0 } })
  if (!("answered" in said)) return
  expect(next(reading, said.answered, REACH).reading).toEqual({ ...reading, experience: 4 })
})

test("Gifted speeds a session by two fifths of its value in percent", () => {
  const reading = { path: ENDURANCE, experience: 0, gifted: 150 }
  expect(settled(reading, ROLL, REACH)).toEqual({
    answered: { gained: 5, experience: 5, tier: 0 },
  })
})

test("a reading stating both Talented and Gifted is refused", () => {
  const reading = { path: ENDURANCE, experience: 0, talented: 100, gifted: 150 }
  expect(settled(reading, ROLL, REACH)).toHaveProperty("refused")
})

test("a Basic Path's ninth Tier pays an Unallocated Stat and its tenth two, with no point", () => {
  const ninth = { path: NUMERACY, experience: 4995 }
  const nine = settled(ninth, ROLL, REACH)
  expect(nine).toEqual({ answered: { gained: 6, experience: 5001, tier: 9 } })
  if (!("answered" in nine)) return
  expect(added(ninth, nine.answered, REACH)).toEqual([
    { page: NUMERACY, key: "experience", by: 6 },
    { page: STATS, key: "value", by: 1 },
  ])
  const tenth = { path: NUMERACY, experience: 9995 }
  const ten = settled(tenth, ROLL, REACH)
  if (!("answered" in ten)) return
  expect(added(tenth, ten.answered, REACH)).toEqual([
    { page: NUMERACY, key: "experience", by: 6 },
    { page: STATS, key: "value", by: 2 },
  ])
})

test("a session handed no roll is refused", () => {
  expect(settled({ path: ENDURANCE, experience: 0 }, null, REACH)).toHaveProperty("refused")
})

test("a Path new to her earns the die alone, and no Tier adds nothing more", () => {
  const reading = { path: ENDURANCE, experience: 0 }
  const said = settled(reading, ROLL, REACH)
  expect(said).toEqual({ answered: { gained: 3, experience: 3, tier: 0 } })
  if (!("answered" in said)) return
  expect(added(reading, said.answered, REACH)).toEqual([
    { page: ENDURANCE, key: "experience", by: 3 },
  ])
  expect(next(reading, said.answered, REACH).crossed).toEqual([])
})

test("a Path that is not a Basic Path she holds is refused, naming hers, known ones first", () => {
  const elite = `${characterSkill.slug}/${giftedRebornNalaPathOfTheCompletionist.slug}`
  const named = [
    giftedRebornNalaPathOfBasicNumeracy,
    giftedRebornNalaPathOfLinguisticsEnglish,
    giftedRebornNalaPathOfEavesdropping,
    giftedRebornNalaPathOfEndurance,
    giftedRebornNalaPathOfWillpower,
  ].map((one) => `\`${characterSkill.slug}/${one.slug}\``)
  expect(settled({ path: elite, experience: 0 }, ROLL, REACH)).toEqual({
    refused: `\`${elite}\` is no Basic Path practice trains; say one of ${named.join(", ")}`,
  })
})

test("another story's character practises on its own pages, never on Nala's", () => {
  const reading = { path: PROBE_NUMERACY, experience: 4995 }
  const said = settled(reading, ROLL, REACH)
  expect(said).toEqual({ answered: { gained: 6, experience: 5001, tier: 9 } })
  if (!("answered" in said)) return
  expect(added(reading, said.answered, REACH)).toEqual([
    { page: PROBE_NUMERACY, key: "experience", by: 6 },
    { page: PROBE_STATS, key: "value", by: 1 },
  ])
  const nalas = { character: PROBE, path: NUMERACY, experience: 0 }
  expect(settled(nalas, ROLL, REACH)).toEqual({
    refused: `\`${NUMERACY}\` is no Basic Path practice trains; say one of \`${PROBE_NUMERACY}\``,
  })
  expect(
    added({ ...reading, experience: 8 }, { gained: 6, experience: 14, tier: 1 }, REACH)
  ).toEqual([
    { page: PROBE_NUMERACY, key: "experience", by: 6 },
    { page: PROBE_MENTAL, key: "value", by: 1 },
  ])
})
