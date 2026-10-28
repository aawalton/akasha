import { parseNumber } from "akasha/code/type/narrowing/modules/parse-number/parse-number.module.code.ts"
import { textIn } from "akasha/code/type/narrowing/modules/text-in/text-in.module.code.ts"
import { addressIn } from "akasha/page/modules/address/page-address.module.code.ts"
import { exportedAs } from "akasha/page/modules/export-name/page-export-name.module.code.ts"
import type { QueryRow } from "akasha/page/query/modules/store-questioning/store-questioning.module.code.ts"
import { activeSlots } from "akasha/story/world/mechanics/ability-kinds/properties/active-slots.number-property.ts"
import { pluralTitle } from "akasha/story/world/mechanics/ability-kinds/properties/plural-title.text-property.ts"
import { worldAbilityKind } from "akasha/story/world/mechanics/ability-kinds/world-ability-kind.page-type.ts"
import { heldSkillDormant } from "akasha/story/world/mechanics/skills/character-skill/properties/held-skill-dormant.boolean-property.ts"
import { abilityKind } from "akasha/story/world/mechanics/skills/properties/ability-kind.relation-property.ts"
import { skillTierSteps } from "akasha/story/world/mechanics/skills/properties/skill-tier-steps.number-property.ts"
import { worldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.ts"
import {
  type AbilityKind,
  genericKindOf,
  kindOf,
  ownNameOf,
  type Skill,
} from "akasha/story/world/stories/played/modules/played-sheet-rows/played-sheet-rows.module.code.ts"

export const EXPERIENCE_KEY = "experience"

export const ATTRIBUTE_KEY = "attribute"

export const ABILITY_KIND_KEY = exportedAs(abilityKind.propertySlug)

export const PLURAL_TITLE_KEY = exportedAs(pluralTitle.propertySlug)

export const ACTIVE_SLOTS_KEY = exportedAs(activeSlots.propertySlug)

export const DORMANT_KEY = exportedAs(heldSkillDormant.propertySlug)

export const TIER_STEPS_KEY = exportedAs(skillTierSteps.propertySlug)

const TYPE_KEY = "type"

const TYPE_OPENING = "page-type/"

const CHARACTER_KEY = "character"

const SKILL_KEY = "skill"

const SLUG_KEY = "slug"

const TITLE_KEY = "title"

const PARTED = "/"

export type AbilityKinds = {
  readonly ofSkill: ReadonlyMap<string, string>
  readonly named: ReadonlyMap<string, AbilityKind>
  readonly tiersOfSkill?: ReadonlyMap<string, readonly number[]>
}

const NO_KINDS: AbilityKinds = { ofSkill: new Map(), named: new Map() }

function numbersIn(value: unknown): readonly number[] {
  if (!Array.isArray(value)) return []
  return value.filter((one): one is number => typeof one === "number" && Number.isFinite(one))
}

function addressed(type: string, row: QueryRow): string | null {
  const slug = textIn(row.values[SLUG_KEY])
  return slug === null ? null : `${type}${PARTED}${slug}`
}

export function abilityKindsIn(
  skillRows: readonly QueryRow[],
  kindRows: readonly QueryRow[]
): AbilityKinds {
  const ofSkill = new Map<string, string>()
  const tiersOfSkill = new Map<string, readonly number[]>()
  for (const row of skillRows) {
    const address = addressed(worldSkill.slug, row)
    const kind = textIn(row.values[ABILITY_KIND_KEY])
    if (address !== null && kind !== null) ofSkill.set(address, kind)
    const tiers = numbersIn(row.values[TIER_STEPS_KEY])
    if (address !== null && tiers.length > 0) tiersOfSkill.set(address, tiers)
  }
  const named = new Map<string, AbilityKind>()
  for (const row of kindRows) {
    const address = addressed(worldAbilityKind.slug, row)
    const title = textIn(row.values[TITLE_KEY])
    const plural = textIn(row.values[PLURAL_TITLE_KEY])
    if (address === null || title === null || plural === null) continue
    const slots = parseNumber(row.values[ACTIVE_SLOTS_KEY])
    named.set(address, {
      title,
      pluralTitle: plural,
      ...(slots === undefined ? {} : { activeSlots: slots }),
    })
  }
  return { ofSkill, named, tiersOfSkill }
}

export function abilityKindOf(row: QueryRow, kinds: AbilityKinds): AbilityKind | undefined {
  const own = textIn(row.values[ABILITY_KIND_KEY])
  const address = own ?? kinds.ofSkill.get(textIn(row.values[SKILL_KEY]) ?? "")
  return address === undefined ? undefined : kinds.named.get(address)
}

export function attributeOf(
  row: QueryRow,
  titles: ReadonlyMap<string, string>
): string | undefined {
  const address = addressIn(textIn(row.values[ATTRIBUTE_KEY]) ?? "")
  if (address.kind !== "qualified") return undefined
  const type = address.pageTypeSlug
  const title = titles.get(`${type}${PARTED}${address.slug}`)
  const named = { values: { ...row.values, title, slug: address.slug } }
  const kind = genericKindOf(type) ?? kindOf(type, textIn(row.values[CHARACTER_KEY]))
  return (ownNameOf(named) ?? kind).toUpperCase()
}

export function heldAddressOf(row: QueryRow): string | undefined {
  const type = textIn(row.values[TYPE_KEY])
  if (type === null) return undefined
  const bare = type.startsWith(TYPE_OPENING) ? type.slice(TYPE_OPENING.length) : type
  return addressed(bare, row) ?? undefined
}

export function skillMoreOf(
  titles: ReadonlyMap<string, string>,
  kinds: AbilityKinds = NO_KINDS
): (row: QueryRow) => Partial<Skill> {
  return (row) => {
    const earned = parseNumber(row.values[EXPERIENCE_KEY])
    const attribute = attributeOf(row, titles)
    const kind = abilityKindOf(row, kinds)
    const held = heldAddressOf(row)
    const dormant = row.values[DORMANT_KEY]
    const tierSteps = kinds.tiersOfSkill?.get(textIn(row.values[SKILL_KEY]) ?? "")
    return {
      ...(tierSteps === undefined ? {} : { tierSteps }),
      ...(earned === undefined ? {} : { experience: earned }),
      ...(attribute === undefined ? {} : { attribute }),
      ...(kind === undefined ? {} : { abilityKind: kind }),
      ...(held === undefined ? {} : { held }),
      ...(typeof dormant === "boolean" ? { dormant } : {}),
    }
  }
}
