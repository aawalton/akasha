import { parseNumber } from "akasha/code/type/narrowing/modules/parse-number/parse-number.module.code.ts"
import { textIn } from "akasha/code/type/narrowing/modules/text-in/text-in.module.code.ts"
import { addressIn } from "akasha/page/modules/address/page-address.module.code.ts"
import { exportedAs } from "akasha/page/modules/export-name/page-export-name.module.code.ts"
import { pluralTitle } from "akasha/story/world/mechanics/ability-kinds/properties/plural-title.text-property.ts"
import { statGroup } from "akasha/story/world/mechanics/metrics/metric-character/attribute/properties/stat-group.relation-property.ts"
import { statSlots } from "akasha/story/world/mechanics/stat-groups/properties/stat-slots.number-property.ts"
import { worldStatGroup } from "akasha/story/world/mechanics/stat-groups/world-stat-group.page-type.ts"

type Values = Readonly<Record<string, unknown>>

type Row = { readonly values: Values }

export const STAT_GROUP_KEY = exportedAs(statGroup.propertySlug)

export const STAT_SLOTS_KEY = exportedAs(statSlots.propertySlug)

const SLUG_KEY = "slug"

const TITLE_KEY = "title"

export const PLURAL_TITLE_KEY = exportedAs(pluralTitle.propertySlug)

const DISPLAY_ORDER_KEY = "displayOrder"

const LAST = Number.MAX_SAFE_INTEGER

export type StatGroup = {
  readonly title: string
  readonly count?: string
  readonly names: readonly string[]
}

function groupSlugOf(stat: Values): string | null {
  const address = addressIn(textIn(stat[STAT_GROUP_KEY]) ?? "")
  if (address.kind !== "qualified" || address.pageTypeSlug !== worldStatGroup.slug) return null
  return address.slug
}

export function statGroupSlugsIn(stats: readonly Row[]): readonly string[] {
  return [...new Set(stats.flatMap((one) => groupSlugOf(one.values) ?? []))]
}

export function statGroupsOf<Stat extends Row>(
  stats: readonly Stat[],
  groups: readonly Values[],
  namesOf: (rows: readonly Stat[]) => readonly string[]
): readonly StatGroup[] {
  const loose = stats.filter((one) => groupSlugOf(one.values) === null)
  const ungrouped = new Set(namesOf(loose))
  return groups
    .map((group) => ({
      group,
      title: textIn(group[PLURAL_TITLE_KEY]) ?? textIn(group[TITLE_KEY]) ?? "",
      order: parseNumber(group[DISPLAY_ORDER_KEY]) ?? LAST,
    }))
    .toSorted((one, other) => one.order - other.order || one.title.localeCompare(other.title))
    .flatMap(({ group, title }) => {
      const slug = textIn(group[SLUG_KEY])
      const held = stats.filter((one) => groupSlugOf(one.values) === slug)
      const names = namesOf([...loose, ...held]).filter((one) => !ungrouped.has(one))
      if (slug === null || title === "" || names.length === 0) return []
      const slots = parseNumber(group[STAT_SLOTS_KEY])
      const count = slots === undefined ? {} : { count: `${String(names.length)}/${String(slots)}` }
      return [{ title, names, ...count }]
    })
}
