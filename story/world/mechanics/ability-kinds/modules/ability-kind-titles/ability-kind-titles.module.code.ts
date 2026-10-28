import { textIn } from "akasha/code/type/narrowing/modules/text-in/text-in.module.code.ts"
import { addressIn } from "akasha/page/modules/address/page-address.module.code.ts"
import { exportedAs } from "akasha/page/modules/export-name/page-export-name.module.code.ts"
import { worldAbilityKind } from "akasha/story/world/mechanics/ability-kinds/world-ability-kind.page-type.ts"
import { abilityKind } from "akasha/story/world/mechanics/skills/properties/ability-kind.relation-property.ts"

type Values = Readonly<Record<string, unknown>>

export const ABILITY_KIND_KEY = exportedAs(abilityKind.propertySlug)

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
