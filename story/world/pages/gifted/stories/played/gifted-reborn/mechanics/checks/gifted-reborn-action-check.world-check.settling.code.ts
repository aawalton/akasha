import { metricCharacterStat } from "akasha/story/world/mechanics/metrics/metric-character/attribute/stat/metric-character-stat.page-type.ts"
import type { Rolled } from "akasha/story/world/mechanics/modules/dice-reading/dice-reading.module.code.ts"
import {
  type Named,
  type Settled,
  type Term,
  tieredSettled,
} from "akasha/story/world/mechanics/modules/tiered-roll/tiered-roll.module.code.ts"
import { characterSkill } from "akasha/story/world/mechanics/skills/character-skill/character-skill.page-type.ts"
import { worldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.ts"
import { giftedPathOfBasicNumeracy } from "akasha/story/world/pages/gifted/mechanics/skills/gifted-path-of-basic-numeracy.world-skill.ts"
import { giftedPathOfEavesdropping } from "akasha/story/world/pages/gifted/mechanics/skills/gifted-path-of-eavesdropping.world-skill.ts"
import { giftedPathOfEndurance } from "akasha/story/world/pages/gifted/mechanics/skills/gifted-path-of-endurance.world-skill.ts"
import { giftedPathOfLinguisticsEnglish } from "akasha/story/world/pages/gifted/mechanics/skills/gifted-path-of-linguistics-english.world-skill.ts"
import { giftedPathOfWillpower } from "akasha/story/world/pages/gifted/mechanics/skills/gifted-path-of-willpower.world-skill.ts"
import { giftedRebornNala } from "akasha/story/world/pages/gifted/stories/played/gifted-reborn/characters/gifted-reborn-nala.character-player.ts"
import { giftedRebornNalaAether } from "akasha/story/world/pages/gifted/stories/played/gifted-reborn/mechanics/metrics/stats/gifted-reborn-nala-aether.metric-character-stat.ts"
import { giftedRebornNalaCoordination } from "akasha/story/world/pages/gifted/stories/played/gifted-reborn/mechanics/metrics/stats/gifted-reborn-nala-coordination.metric-character-stat.ts"
import { giftedRebornNalaMental } from "akasha/story/world/pages/gifted/stories/played/gifted-reborn/mechanics/metrics/stats/gifted-reborn-nala-mental.metric-character-stat.ts"
import { giftedRebornNalaStamina } from "akasha/story/world/pages/gifted/stories/played/gifted-reborn/mechanics/metrics/stats/gifted-reborn-nala-stamina.metric-character-stat.ts"
import { giftedRebornNalaStrength } from "akasha/story/world/pages/gifted/stories/played/gifted-reborn/mechanics/metrics/stats/gifted-reborn-nala-strength.metric-character-stat.ts"
import { giftedRebornNalaPathOfBasicNumeracy } from "akasha/story/world/pages/gifted/stories/played/gifted-reborn/mechanics/skills-held/gifted-reborn-nala-path-of-basic-numeracy.character-skill.ts"
import { giftedRebornNalaPathOfEavesdropping } from "akasha/story/world/pages/gifted/stories/played/gifted-reborn/mechanics/skills-held/gifted-reborn-nala-path-of-eavesdropping.character-skill.ts"
import { giftedRebornNalaPathOfEndurance } from "akasha/story/world/pages/gifted/stories/played/gifted-reborn/mechanics/skills-held/gifted-reborn-nala-path-of-endurance.character-skill.ts"
import { giftedRebornNalaPathOfLinguisticsEnglish } from "akasha/story/world/pages/gifted/stories/played/gifted-reborn/mechanics/skills-held/gifted-reborn-nala-path-of-linguistics-english.character-skill.ts"
import { giftedRebornNalaPathOfWillpower } from "akasha/story/world/pages/gifted/stories/played/gifted-reborn/mechanics/skills-held/gifted-reborn-nala-path-of-willpower.character-skill.ts"

const BASIC_TIERS = [10, 25, 50, 100, 250, 500, 1000, 2500, 5000, 10000]

const BASIC_POINTS = 5

const ATTRIBUTE_WHOLE = 100

const ATTRIBUTE_SHARE = 2

type Kind = { readonly tiers: readonly number[]; readonly points: number }

const BASIC: Kind = { tiers: BASIC_TIERS, points: BASIC_POINTS }

const PATHS = [
  { held: giftedRebornNalaPathOfBasicNumeracy, path: giftedPathOfBasicNumeracy, kind: BASIC },
  { held: giftedRebornNalaPathOfEavesdropping, path: giftedPathOfEavesdropping, kind: BASIC },
  { held: giftedRebornNalaPathOfEndurance, path: giftedPathOfEndurance, kind: BASIC },
  {
    held: giftedRebornNalaPathOfLinguisticsEnglish,
    path: giftedPathOfLinguisticsEnglish,
    kind: BASIC,
  },
  { held: giftedRebornNalaPathOfWillpower, path: giftedPathOfWillpower, kind: BASIC },
]

const ATTRIBUTES = [
  giftedRebornNalaStrength,
  giftedRebornNalaStamina,
  giftedRebornNalaCoordination,
  giftedRebornNalaMental,
  giftedRebornNalaAether,
]

const OWNED = `${giftedRebornNala.slug}-`

type Termed = { readonly answered: Term } | { readonly refused: string }

function addressOf(type: string, slug: string): string {
  return `${type}/${slug}`
}

function pathTerm(said: string): Term | null {
  const one = PATHS.find((each) => addressOf(characterSkill.slug, each.held.slug) === said)
  if (one === undefined || one.held.skill !== addressOf(worldSkill.slug, one.path.slug)) return null
  const passed = one.kind.tiers.filter((tier) => one.held.experience >= tier).length
  return { from: one.path.title, by: passed * one.kind.points }
}

function attributeTerm(said: string): Term | null {
  const stat = ATTRIBUTES.find((one) => addressOf(metricCharacterStat.slug, one.slug) === said)
  if (stat === undefined) return null
  const name = stat.slug.slice(OWNED.length)
  const from = `${name.charAt(0).toUpperCase()}${name.slice(1)}`
  return { from, by: Math.floor((stat.value - ATTRIBUTE_WHOLE) / ATTRIBUTE_SHARE) }
}

function listed(type: string, slugs: readonly string[]): string {
  return slugs.map((one) => `\`${addressOf(type, one)}\``).join(", ")
}

function termOf(named: Named): Termed {
  if (named.skill !== undefined) {
    const term = pathTerm(named.skill)
    if (term !== null) return { answered: term }
    const crafts = listed(
      characterSkill.slug,
      PATHS.map((one) => one.held.slug)
    )
    return { refused: `\`${named.skill}\` is no Path an act names; say one of ${crafts}` }
  }
  const said = named.stat ?? ""
  const term = attributeTerm(said)
  if (term !== null) return { answered: term }
  const basic = listed(
    metricCharacterStat.slug,
    ATTRIBUTES.map((one) => one.slug)
  )
  return { refused: `\`${said}\` is no Basic Attribute; say one of ${basic}` }
}

export function settled(reading: unknown, roll: Rolled | null): Settled {
  return tieredSettled(reading, roll, termOf)
}
