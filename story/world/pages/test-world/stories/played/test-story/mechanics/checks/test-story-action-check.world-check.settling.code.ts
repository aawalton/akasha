import { isRecord } from "akasha/code/type/narrowing/modules/is-record/is-record.module.code.ts"
import {
  listedAt,
  valueByPath,
  valuesOfType,
} from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { akashaRoot } from "akasha/page/modules/checkout-roots/checkout-roots.module.code.ts"
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
import { worldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.ts"

const MOST_SKILL = 50

const STAT_MIDDLE = 10

const STAT_STEP = 3

const CHARACTER = "character"

const SLUG = "slug"

const SKILL = "skill"

const EXPERIENCE = "experience"

const VALUE = "value"

const TITLE = "title"

type Termed = { readonly answered: Term } | { readonly refused: string }

export type Held = { readonly slug: string; readonly value: Value }

export type Reach = {
  readonly pagesOf: (pageTypeSlug: string, character: string) => readonly Held[]
  readonly titleOf: (skill: string) => string | null
}

function heldBy(pageTypeSlug: string, character: string): readonly Held[] {
  const found: Held[] = []
  for (const one of valuesOfType(akashaRoot(), pageTypeSlug)) {
    const slug = textAt(one.value, SLUG)
    if (slug !== null && one.value[CHARACTER] === character) found.push({ slug, value: one.value })
  }
  return found.toSorted((one, two) => (one.slug < two.slug ? -1 : one.slug > two.slug ? 1 : 0))
}

function titleIndexed(skill: string): string | null {
  const root = akashaRoot()
  const found = listedAt(root, worldSkill.slug, slugOf(skill))[0]
  const value = found === undefined ? null : valueByPath(root, found.path)
  return value === null ? null : textAt(value, TITLE)
}

const INDEXED: Reach = { pagesOf: heldBy, titleOf: titleIndexed }

function addressOf(type: string, slug: string): string {
  return `${type}/${slug}`
}

function skillTerm(said: string, skills: readonly Held[], reach: Reach): Term | null {
  const held = skills.find((one) => addressOf(characterSkill.slug, one.slug) === said)
  if (held === undefined) return null
  const skill = textAt(held.value, SKILL)
  const from = (skill === null ? null : reach.titleOf(skill)) ?? held.slug
  return { from, by: Math.min(numberAt(held.value, EXPERIENCE) ?? 0, MOST_SKILL) }
}

function statTerm(said: string, stats: readonly Held[], owned: string): Term | null {
  const stat = stats.find((one) => addressOf(metricCharacterStat.slug, one.slug) === said)
  if (stat === undefined) return null
  const name = stat.slug.slice(owned.length)
  const from = `${name.charAt(0).toUpperCase()}${name.slice(1)}`
  return { from, by: ((numberAt(stat.value, VALUE) ?? STAT_MIDDLE) - STAT_MIDDLE) * STAT_STEP }
}

function listed(type: string, pages: readonly Held[]): string {
  return pages.map((one) => `\`${addressOf(type, one.slug)}\``).join(", ")
}

function termsOf(character: string, reach: Reach): (named: Named) => Termed {
  const skills = reach.pagesOf(characterSkill.slug, character)
  const stats = reach.pagesOf(metricCharacterStat.slug, character)
  const owned = `${slugOf(character)}-`
  return (named) => {
    if (named.skill !== undefined) {
      const term = skillTerm(named.skill, skills, reach)
      if (term !== null) return { answered: term }
      const held = listed(characterSkill.slug, skills)
      return { refused: `\`${named.skill}\` is no skill held here; say one of ${held}` }
    }
    const said = named.stat ?? ""
    const term = statTerm(said, stats, owned)
    if (term !== null) return { answered: term }
    return {
      refused: `\`${said}\` is no stat here; say one of ${listed(metricCharacterStat.slug, stats)}`,
    }
  }
}

function characterOf(reading: unknown): string {
  if (!isRecord(reading)) return ""
  const said = reading[CHARACTER]
  return typeof said === "string" ? said : ""
}

export function settled(reading: unknown, roll: Rolled | null, reach: Reach = INDEXED): Settled {
  return tieredSettled(reading, roll, termsOf(characterOf(reading), reach))
}
