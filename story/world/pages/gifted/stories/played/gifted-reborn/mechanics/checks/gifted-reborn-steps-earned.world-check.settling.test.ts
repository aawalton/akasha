import { expect, test } from "bun:test"
import { slugOf } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import { characterPlayer } from "akasha/story/world/characters/character-player/character-player.page-type.ts"
import { metricCharacterStat } from "akasha/story/world/mechanics/metrics/metric-character/attribute/stat/metric-character-stat.page-type.ts"
import type {
  HeldPath,
  PathReach,
} from "akasha/story/world/mechanics/modules/gifted-path-stepping/gifted-path-stepping.module.code.ts"
import { characterSkill } from "akasha/story/world/mechanics/skills/character-skill/character-skill.page-type.ts"
import { giftedUnallocatedStats } from "akasha/story/world/pages/gifted/mechanics/metrics/resources/unallocated-stats/gifted-unallocated-stats.page-type.ts"
import { giftedPathOfEndurance } from "akasha/story/world/pages/gifted/mechanics/skills/gifted-path-of-endurance.world-skill.ts"
import { giftedPathOfSoulstealing } from "akasha/story/world/pages/gifted/mechanics/skills/gifted-path-of-soulstealing.world-skill.ts"
import { giftedPathOfTheCompletionist } from "akasha/story/world/pages/gifted/mechanics/skills/gifted-path-of-the-completionist.world-skill.ts"
import { giftedPathOfWillpower } from "akasha/story/world/pages/gifted/mechanics/skills/gifted-path-of-willpower.world-skill.ts"
import { giftedRebornNala } from "akasha/story/world/pages/gifted/stories/played/gifted-reborn/characters/gifted-reborn-nala.character-player.ts"
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

const NALA = `${characterPlayer.slug}/${giftedRebornNala.slug}`

const STATS = `${giftedUnallocatedStats.slug}/${nalaUnallocatedStats.slug}`

const PROBE = `${characterPlayer.slug}/probe-nala`

const PROBE_STATS = `${giftedUnallocatedStats.slug}/probe-nala`

const PROBE_ENDURANCE = `${characterSkill.slug}/probe-nala-path-of-endurance`

const PROBE_STAMINA = `${metricCharacterStat.slug}/probe-nala-stamina`

const ROLL = { total: 3, crit: false, fumble: false }

type Page = { readonly slug: string; readonly character: string; readonly attribute?: string }

type Skill = { readonly title: string; readonly tierSteps: readonly number[] }

function heldAs(held: Page, path: Skill): HeldPath {
  return {
    address: `${characterSkill.slug}/${held.slug}`,
    character: held.character,
    title: path.title,
    tiers: path.tierSteps,
    attribute: held.attribute ?? null,
    setAside: false,
  }
}

const HELD: readonly HeldPath[] = [
  heldAs(giftedRebornNalaPathOfEndurance, giftedPathOfEndurance),
  heldAs(giftedRebornNalaPathOfSoulstealing, giftedPathOfSoulstealing),
  heldAs(giftedRebornNalaPathOfTheCompletionist, giftedPathOfTheCompletionist),
  heldAs(giftedRebornNalaPathOfWillpower, giftedPathOfWillpower),
  heldAs(
    { slug: "probe-nala-path-of-endurance", character: PROBE, attribute: PROBE_STAMINA },
    giftedPathOfEndurance
  ),
]

function ownedBy(address: string): string | null {
  const owner = HELD.find((one) => slugOf(address).startsWith(`${slugOf(one.character)}-`))
  return owner?.character ?? null
}

const REACH: PathReach = {
  heldAt: (address) => HELD.find((one) => one.address === address) ?? null,
  heldBy: (character) => HELD.filter((one) => one.character === character),
  ownerOf: ownedBy,
  statsOf: (character) => (character === NALA ? STATS : PROBE_STATS),
}

test("Talented 109 turns an Achievement's 1000 steps into 1218, as Survive a Fatal Blow paid", () => {
  const reading = {
    earned: [{ path: ENDURANCE, experience: 49, achievement: { basic: 1000 } }],
    talented: 109,
  }
  const said = settled(reading, null, REACH)
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
  expect(added(reading, said.answered, REACH)).toEqual([
    { page: ENDURANCE, key: "experience", by: 1218 },
    { page: giftedRebornNalaPathOfEndurance.attribute, key: "value", by: 5 },
  ])
})

test("Gifted speeds by two fifths of its value and falls to the whole step below", () => {
  const sixty = { earned: [{ path: WILLPOWER, experience: 0, achievement: { basic: 1000 } }] }
  expect(settled({ ...sixty, gifted: 150 }, null, REACH)).toMatchObject({
    answered: { earned: [{ gained: 1600 }] },
  })
  const deed = { earned: [{ path: WILLPOWER, experience: 0, deed: 100 }] }
  expect(settled({ ...deed, gifted: 159 }, null, REACH)).toMatchObject({
    answered: { earned: [{ gained: 163 }] },
  })
  expect(settled({ ...deed, gifted: 187 }, null, REACH)).toMatchObject({
    answered: { earned: [{ gained: 174 }] },
  })
})

test("an Achievement pays the steps it offers the chosen Path's kind, and no other kind", () => {
  const offered = { path: WILLPOWER, experience: 0, achievement: { advanced: 100 } }
  expect(settled({ earned: [offered] }, null, REACH)).toHaveProperty("refused")
  const either = { ...offered, achievement: { basic: 1000, advanced: 100 } }
  expect(settled({ earned: [either] }, null, REACH)).toMatchObject({
    answered: { earned: [{ gained: 1000 }] },
  })
})

test("a mutated Path takes a deed's steps and refuses an Achievement's", () => {
  const deed = { earned: [{ path: SOULSTEALING, experience: 0, deed: 1 }] }
  expect(settled(deed, null, REACH)).toMatchObject({
    answered: { earned: [{ gained: 1, tier: 0 }] },
  })
  const achievement = { path: SOULSTEALING, experience: 0, achievement: { basic: 1000 } }
  expect(settled({ earned: [achievement] }, null, REACH)).toHaveProperty("refused")
})

test("a Basic Path completed pays the Completionist 12 at Talented 104, and Tier 1's 3 Stats", () => {
  const reading = {
    earned: [{ path: COMPLETIONIST, experience: 0, completed: "basic" }],
    talented: 104,
  }
  const said = settled(reading, null, REACH)
  if (!("answered" in said)) throw new Error("the Completionist was refused a Path completed")
  expect(said.answered.earned[0]).toMatchObject({ gained: 12, experience: 12, tier: 1 })
  expect(added(reading, said.answered, REACH)).toEqual([
    { page: COMPLETIONIST, key: "experience", by: 12 },
    { page: STATS, key: "value", by: 3 },
  ])
})

test("an Elite Path completed pays 40 sped, so Gifted 159 takes 144 to 209 and Tier 3", () => {
  const reading = {
    earned: [{ path: COMPLETIONIST, experience: 144, completed: "elite" }],
    gifted: 159,
  }
  const said = settled(reading, null, REACH)
  if (!("answered" in said))
    throw new Error("the Completionist was refused an Elite Path completed")
  expect(said.answered.earned[0]).toMatchObject({ gained: 65, experience: 209, tier: 3 })
  expect(added(reading, said.answered, REACH)).toEqual([
    { page: COMPLETIONIST, key: "experience", by: 65 },
  ])
})

test("the Completionist takes an Achievement's Advanced steps, 100 at Gifted 187 being 174", () => {
  const entry = {
    path: COMPLETIONIST,
    experience: 324,
    achievement: { basic: 1000, advanced: 100 },
  }
  expect(settled({ earned: [entry], gifted: 187 }, null, REACH)).toMatchObject({
    answered: { earned: [{ gained: 174, experience: 498, tier: 3 }] },
  })
})

test("the Completionist refuses a deed, and another Path refuses a Path completed", () => {
  expect(
    settled({ earned: [{ path: COMPLETIONIST, experience: 0, deed: 1 }] }, null, REACH)
  ).toHaveProperty("refused")
  const completed = { path: ENDURANCE, experience: 0, completed: "basic" }
  expect(settled({ earned: [completed] }, null, REACH)).toHaveProperty("refused")
})

test("several Paths settle at once, each named once", () => {
  const reading = {
    earned: [
      { path: SOULSTEALING, experience: 0, deed: 2 },
      { path: ENDURANCE, experience: 0, deed: 12 },
    ],
  }
  const said = settled(reading, null, REACH)
  if (!("answered" in said)) throw new Error("two Paths were refused")
  expect(added(reading, said.answered, REACH)).toEqual([
    { page: SOULSTEALING, key: "experience", by: 2 },
    { page: ENDURANCE, key: "experience", by: 12 },
    { page: giftedRebornNalaPathOfEndurance.attribute, key: "value", by: 1 },
  ])
  const twice = { earned: [reading.earned[1], reading.earned[1]] }
  expect(settled(twice, null, REACH)).toHaveProperty("refused")
})

test("an entry stating both a deed and an Achievement, or a roll, is refused", () => {
  const both = { path: ENDURANCE, experience: 0, deed: 3, achievement: { basic: 1000 } }
  expect(settled({ earned: [both] }, null, REACH)).toHaveProperty("refused")
  const deed = { earned: [{ path: ENDURANCE, experience: 0, deed: 3 }] }
  expect(settled(deed, ROLL, REACH)).toHaveProperty("refused")
})

test("a Path Nala does not pay is refused, naming the Paths she does in order", () => {
  const said = `${characterSkill.slug}/${giftedRebornNala.slug}-path-of-nothing`
  const named = [ENDURANCE, WILLPOWER, SOULSTEALING, COMPLETIONIST].map((one) => `\`${one}\``)
  expect(settled({ earned: [{ path: said, experience: 0, deed: 1 }] }, null, REACH)).toEqual({
    refused: `\`${said}\` is no Path this check pays; say one of ${named.join(", ")}`,
  })
})

test("another story's character is paid on its own pages, never on Nala's", () => {
  const reading = { earned: [{ path: PROBE_ENDURANCE, experience: 4995, deed: 10 }] }
  const said = settled(reading, null, REACH)
  if (!("answered" in said)) throw new Error("the clone's own Path was refused")
  expect(added(reading, said.answered, REACH)).toEqual([
    { page: PROBE_ENDURANCE, key: "experience", by: 10 },
    { page: PROBE_STATS, key: "value", by: 1 },
  ])
  const nalas = { character: PROBE, earned: [{ path: ENDURANCE, experience: 0, deed: 1 }] }
  expect(settled(nalas, null, REACH)).toEqual({
    refused: `\`${ENDURANCE}\` is no Path this check pays; say one of \`${PROBE_ENDURANCE}\``,
  })
})
