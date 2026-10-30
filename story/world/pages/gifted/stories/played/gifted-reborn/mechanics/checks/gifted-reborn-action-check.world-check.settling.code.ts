import { isRecord } from "akasha/code/type/narrowing/modules/is-record/is-record.module.code.ts"
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
import { worldStatGroup } from "akasha/story/world/mechanics/stat-groups/world-stat-group.page-type.ts"
import { giftedBasicAttributes } from "akasha/story/world/pages/gifted/mechanics/stat-groups/gifted-basic-attributes.world-stat-group.ts"

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

const VALUE = "value"

const STAT_GROUP = "statGroup"

const DISPLAY_ORDER = "displayOrder"

type Held = { readonly slug: string; readonly value: Value }

type Path = { readonly title: string; readonly tierSteps: readonly number[] }

type Attribute = { readonly slug: string; readonly value: number }

type Reach = {
  readonly skillsOf: (character: string) => readonly Held[]
  readonly pathOf: (skill: string) => Path | null
  readonly attributesOf: (character: string) => readonly Attribute[]
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

function groupTitled(root: string, group: string): string | null {
  const found = listedAt(root, worldStatGroup.slug, slugOf(group))[0]
  const value = found === undefined ? null : valueByPath(root, found.path)
  return value === null ? null : textAt(value, TITLE)
}

function attributesHeld(character: string): readonly Attribute[] {
  const root = akashaRoot()
  const found: { readonly held: Attribute; readonly order: number }[] = []
  for (const one of valuesOfType(root, metricCharacterStat.slug)) {
    const slug = textAt(one.value, SLUG)
    const value = numberAt(one.value, VALUE)
    const group = textAt(one.value, STAT_GROUP)
    if (slug === null || value === null || group === null) continue
    if (one.value[CHARACTER] !== character) continue
    if (groupTitled(root, group) !== giftedBasicAttributes.title) continue
    found.push({ held: { slug, value }, order: numberAt(one.value, DISPLAY_ORDER) ?? 0 })
  }
  return found.toSorted((one, two) => one.order - two.order).map((one) => one.held)
}

const INDEXED: Reach = { skillsOf: skillsHeld, pathOf: pathIndexed, attributesOf: attributesHeld }

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

function ownedName(character: string, slug: string): string {
  const owned = `${slugOf(character)}-`
  return slug.startsWith(owned) ? slug.slice(owned.length) : slug
}

function attributeTerm(
  said: string,
  character: string,
  attributes: readonly Attribute[]
): Term | null {
  const stat = attributes.find((one) => addressOf(metricCharacterStat.slug, one.slug) === said)
  if (stat === undefined) return null
  const name = ownedName(character, stat.slug)
  const from = `${name.charAt(0).toUpperCase()}${name.slice(1)}`
  return { from, by: Math.floor((stat.value - ATTRIBUTE_WHOLE) / ATTRIBUTE_SHARE) }
}

function listed(type: string, slugs: readonly string[]): string {
  return slugs.map((one) => `\`${addressOf(type, one)}\``).join(", ")
}

function termOf(character: string, reach: Reach): (named: Named) => Termed {
  return (named) =>
    named.skill === undefined
      ? statOf(named, character, reach)
      : pathOf(named.skill, character, reach)
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

function statOf(named: Named, character: string, reach: Reach): Termed {
  const said = named.stat ?? ""
  const attributes = reach.attributesOf(character)
  const term = attributeTerm(said, character, attributes)
  if (term !== null) return { answered: term }
  const basic = listed(
    metricCharacterStat.slug,
    attributes.map((one) => one.slug)
  )
  return { refused: `\`${said}\` is no Basic Attribute; say one of ${basic}` }
}

function characterIn(reading: unknown): string {
  return isRecord(reading) ? (textAt(reading, CHARACTER) ?? "") : ""
}

export function settled(reading: unknown, roll: Rolled | null, reach: Reach = INDEXED): Settled {
  return tieredSettled(reading, roll, termOf(characterIn(reading), reach))
}
