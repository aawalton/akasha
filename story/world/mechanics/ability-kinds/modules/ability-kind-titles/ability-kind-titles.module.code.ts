import { textIn } from "akasha/code/type/narrowing/modules/text-in/text-in.module.code.ts"
import { addressIn } from "akasha/page/modules/address/page-address.module.code.ts"
import { exportedAs } from "akasha/page/modules/export-name/page-export-name.module.code.ts"
import { activeSlots } from "akasha/story/world/mechanics/ability-kinds/properties/active-slots.number-property.ts"
import { worldAbilityKind } from "akasha/story/world/mechanics/ability-kinds/world-ability-kind.page-type.ts"
import { abilityKind } from "akasha/story/world/mechanics/skills/properties/ability-kind.relation-property.ts"
import { skillTierSteps } from "akasha/story/world/mechanics/skills/properties/skill-tier-steps.number-property.ts"

type Values = Readonly<Record<string, unknown>>

export const ABILITY_KIND_KEY = exportedAs(abilityKind.propertySlug)

export const ACTIVE_SLOTS_KEY = exportedAs(activeSlots.propertySlug)

export const TITLE_KEY = "title"

export const SLUG_KEY = "slug"

function kindSlugOf(skill: Values): string | null {
  const address = addressIn(textIn(skill[ABILITY_KIND_KEY]) ?? "")
  if (address.kind !== "qualified" || address.pageTypeSlug !== worldAbilityKind.slug) return null
  return address.slug
}

export function abilityKindSlugsIn(skills: readonly Values[]): readonly string[] {
  return [...new Set(skills.flatMap((one) => kindSlugOf(one) ?? []))]
}

export function abilityKindTitlesOf(
  skills: readonly Values[],
  kinds: readonly Values[]
): ReadonlyMap<string, string> {
  const named = new Map<string, string>()
  for (const kind of kinds) {
    const slug = textIn(kind[SLUG_KEY])
    const title = textIn(kind[TITLE_KEY])
    if (slug !== null && title !== null) named.set(slug, title)
  }
  const titles = new Map<string, string | null>()
  for (const skill of skills) {
    const name = textIn(skill[TITLE_KEY])
    const kind = named.get(kindSlugOf(skill) ?? "")
    if (name === null || kind === undefined) continue
    const held = titles.get(name)
    titles.set(name, held === undefined || held === kind ? kind : null)
  }
  return new Map(
    [...titles].flatMap(([name, kind]): [string, string][] => (kind === null ? [] : [[name, kind]]))
  )
}

export function slottedTitlesOf(
  skills: readonly Values[],
  kinds: readonly Values[]
): ReadonlySet<string> {
  const slotted = new Set<string>()
  for (const kind of kinds) {
    const slug = textIn(kind[SLUG_KEY])
    if (slug !== null && typeof kind[ACTIVE_SLOTS_KEY] === "number") slotted.add(slug)
  }
  return new Set(
    skills.flatMap((one) => {
      const title = textIn(one[TITLE_KEY])
      return title !== null && slotted.has(kindSlugOf(one) ?? "") ? [title] : []
    })
  )
}

export const TIER_STEPS_KEY = exportedAs(skillTierSteps.propertySlug)

const DEFAULT_KIND_TITLE = "Skill"

export type HeldAbility = {
  readonly kind: string
  readonly slotted: boolean
  readonly tierSteps: readonly number[]
}

export type WorldAbilities = {
  readonly abilityKinds: ReadonlyMap<string, string>
  readonly slottedAbilities: ReadonlySet<string>
  readonly heldAbilities: ReadonlyMap<string, HeldAbility>
}

export const NO_ABILITIES: WorldAbilities = {
  abilityKinds: new Map(),
  slottedAbilities: new Set(),
  heldAbilities: new Map(),
}

export function worldAbilitiesOf(
  skills: readonly Values[],
  kinds: readonly Values[]
): WorldAbilities {
  const titles = skills.flatMap((one) => textIn(one[TITLE_KEY]) ?? [])
  return {
    abilityKinds: abilityKindTitlesOf(skills, kinds),
    slottedAbilities: slottedTitlesOf(skills, kinds),
    heldAbilities: new Map(
      titles.flatMap((title): [string, HeldAbility][] => {
        const held = heldAbilityOf(title, skills, kinds)
        return held === null ? [] : [[title, held]]
      })
    ),
  }
}

export function heldAbilityOf(
  title: string,
  skills: readonly Values[],
  kinds: readonly Values[]
): HeldAbility | null {
  const skill = skills.find((one) => textIn(one[TITLE_KEY]) === title)
  if (skill === undefined) return null
  const tiers = skill[TIER_STEPS_KEY]
  return {
    kind: abilityKindTitlesOf(skills, kinds).get(title) ?? DEFAULT_KIND_TITLE,
    slotted: slottedTitlesOf(skills, kinds).has(title),
    tierSteps: Array.isArray(tiers) ? tiers.filter((one) => typeof one === "number") : [],
  }
}

export function unlockedHeadingOf(ability: HeldAbility): string {
  return ability.slotted ? `${ability.kind} Unlocked` : ability.kind
}

export function crossedHeadingOf(ability: HeldAbility, tier: number): string {
  const last = ability.tierSteps.length
  return `${ability.kind} ${last > 0 && tier >= last ? "Completed" : "Advanced"}`
}
