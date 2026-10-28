import {
  listedAt,
  valueByPath,
  valuesOfType,
} from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { akashaRoot } from "akasha/page/modules/checkout-roots/checkout-roots.module.code.ts"
import { exportedAs } from "akasha/page/modules/export-name/page-export-name.module.code.ts"
import {
  numberAt,
  slugOf,
  textAt,
  type Value,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import { characterPlayer } from "akasha/story/world/characters/character-player/character-player.page-type.ts"
import { metricCharacterStat } from "akasha/story/world/mechanics/metrics/metric-character/attribute/stat/metric-character-stat.page-type.ts"
import type { Rolled } from "akasha/story/world/mechanics/modules/dice-reading/dice-reading.module.code.ts"
import {
  type Named,
  type Settled,
  type Term,
  tieredSettled,
} from "akasha/story/world/mechanics/modules/tiered-roll/tiered-roll.module.code.ts"
import { characterSkill } from "akasha/story/world/mechanics/skills/character-skill/character-skill.page-type.ts"
import { skillTierSteps } from "akasha/story/world/mechanics/skills/properties/skill-tier-steps.number-property.ts"
import { worldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.ts"
import { giftedRebornNala } from "akasha/story/world/pages/gifted/stories/played/gifted-reborn/characters/gifted-reborn-nala.character-player.ts"
import { giftedRebornNalaAether } from "akasha/story/world/pages/gifted/stories/played/gifted-reborn/mechanics/metrics/stats/gifted-reborn-nala-aether.metric-character-stat.ts"
import { giftedRebornNalaCoordination } from "akasha/story/world/pages/gifted/stories/played/gifted-reborn/mechanics/metrics/stats/gifted-reborn-nala-coordination.metric-character-stat.ts"
import { giftedRebornNalaMental } from "akasha/story/world/pages/gifted/stories/played/gifted-reborn/mechanics/metrics/stats/gifted-reborn-nala-mental.metric-character-stat.ts"
import { giftedRebornNalaStamina } from "akasha/story/world/pages/gifted/stories/played/gifted-reborn/mechanics/metrics/stats/gifted-reborn-nala-stamina.metric-character-stat.ts"
import { giftedRebornNalaStrength } from "akasha/story/world/pages/gifted/stories/played/gifted-reborn/mechanics/metrics/stats/gifted-reborn-nala-strength.metric-character-stat.ts"

const BASIC_TIERS = [10, 25, 50, 100, 250, 500, 1000, 2500, 5000, 10000]

const BASIC_POINTS = 5

const ATTRIBUTE_WHOLE = 100

const ATTRIBUTE_SHARE = 2

type Kind = { readonly tiers: readonly number[]; readonly points: number }

const BASIC: Kind = { tiers: BASIC_TIERS, points: BASIC_POINTS }

const ADVANCED_TIERS = [10, 50, 200, 500, 1000]

const ADVANCED_POINTS = 10

const ADVANCED: Kind = { tiers: ADVANCED_TIERS, points: ADVANCED_POINTS }

const KINDS: readonly Kind[] = [BASIC, ADVANCED]

const CHARACTER = "character"

const SLUG = "slug"

const SKILL = "skill"

const EXPERIENCE = "experience"

const TITLE = "title"

const UNREVEALED = "unrevealed"

const TIER_STEPS = exportedAs(skillTierSteps.propertySlug)

const NALA = `${characterPlayer.slug}/${giftedRebornNala.slug}`

type Held = { readonly slug: string; readonly value: Value }

type Path = { readonly title: string; readonly tierSteps: readonly number[] }

type Reach = {
  readonly skillsOf: (character: string) => readonly Held[]
  readonly pathOf: (skill: string) => Path | null
}

function kindBonus(kind: Kind, experience: number): number {
  return kind.tiers.filter((tier) => experience >= tier).length * kind.points
}

function kindOf(tierSteps: readonly number[]): Kind | undefined {
  return KINDS.find(
    (kind) =>
      kind.tiers.length === tierSteps.length && kind.tiers.every((at, one) => at === tierSteps[one])
  )
}

function skillsHeld(character: string): readonly Held[] {
  const found: Held[] = []
  for (const one of valuesOfType(akashaRoot(), characterSkill.slug)) {
    const slug = textAt(one.value, SLUG)
    if (slug !== null && one.value[CHARACTER] === character) found.push({ slug, value: one.value })
  }
  return found.toSorted((one, two) => (one.slug < two.slug ? -1 : one.slug > two.slug ? 1 : 0))
}

function pathIndexed(skill: string): Path | null {
  const root = akashaRoot()
  const found = listedAt(root, worldSkill.slug, slugOf(skill))[0]
  const value = found === undefined ? null : valueByPath(root, found.path)
  const title = value === null ? null : textAt(value, TITLE)
  if (value === null || title === null) return null
  const steps = value[TIER_STEPS]
  const tierSteps = Array.isArray(steps)
    ? steps.filter((one): one is number => typeof one === "number")
    : []
  return { title, tierSteps }
}

const INDEXED: Reach = { skillsOf: skillsHeld, pathOf: pathIndexed }

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

function pathTerm(said: string, skills: readonly Held[], reach: Reach): Term | null {
  const held = skills.find((one) => addressOf(characterSkill.slug, one.slug) === said)
  if (held === undefined || held.value[UNREVEALED] === true) return null
  const skill = textAt(held.value, SKILL)
  const path = skill === null ? null : reach.pathOf(skill)
  const kind = path === null ? undefined : kindOf(path.tierSteps)
  if (path === null || kind === undefined) return null
  return { from: path.title, by: kindBonus(kind, numberAt(held.value, EXPERIENCE) ?? 0) }
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

function termOf(character: string, reach: Reach): (named: Named) => Termed {
  return (named) =>
    named.skill === undefined ? statOf(named) : pathOf(named.skill, character, reach)
}

function pathOf(said: string, character: string, reach: Reach): Termed {
  const skills = reach.skillsOf(character)
  const term = pathTerm(said, skills, reach)
  if (term !== null) return { answered: term }
  const open = skills
    .filter((one) => pathTerm(addressOf(characterSkill.slug, one.slug), skills, reach) !== null)
    .map((one) => one.slug)
  if (open.length === 0) {
    return { refused: `\`${said}\` is no Path an act names; no Path is open yet` }
  }
  const crafts = listed(characterSkill.slug, open)
  return { refused: `\`${said}\` is no Path an act names; say one of ${crafts}` }
}

function statOf(named: Named): Termed {
  const said = named.stat ?? ""
  const term = attributeTerm(said)
  if (term !== null) return { answered: term }
  const basic = listed(
    metricCharacterStat.slug,
    ATTRIBUTES.map((one) => one.slug)
  )
  return { refused: `\`${said}\` is no Basic Attribute; say one of ${basic}` }
}

export function settled(reading: unknown, roll: Rolled | null, reach: Reach = INDEXED): Settled {
  return tieredSettled(reading, roll, termOf(NALA, reach))
}
