import { colorRuleVariantToBadgeVariant } from "akasha/page/core/modules/resolve-badge-variant/resolve-badge-variant.module.code.ts"
import { titledAs } from "akasha/page/core/modules/titled-as/titled-as.module.code.ts"
import type {
  BadgeVariant,
  ColorRuleVariant,
} from "akasha/page/core/schema/modules/color-rule-variant/color-rule-variant.module.code.ts"

export type RelationValue = string | { id: string; title: string }

export function getRelationId(value: RelationValue): string {
  return typeof value === "string" ? value : value.id
}

export function resolveRelationPageId(
  resolver: { resolve: (named: string) => { id: string } | null } | null,
  value: RelationValue
): string {
  const named = getRelationId(value)
  return resolver?.resolve(named)?.id ?? named
}

const QUALIFIED_BY = "/"

function namedFrom(said: string): string {
  return said.includes(QUALIFIED_BY) ? titledAs(said) : said
}

export function resolveRelationName(
  resolver: { resolve: (id: string) => { id: string; title: string } | null } | null,
  value: RelationValue
): string {
  if (typeof value === "object") return value.title !== "" ? value.title : namedFrom(value.id)
  if (!resolver) return namedFrom(value)
  const entry = resolver.resolve(value)
  if (entry === null) return namedFrom(value)
  return entry.title !== "" ? entry.title : namedFrom(value)
}

export function resolveRelationVariant(
  resolver: { resolve: (id: string) => { color?: ColorRuleVariant } | null } | null,
  value: RelationValue,
  accent: boolean | undefined
): BadgeVariant {
  const color = resolver?.resolve(getRelationId(value))?.color
  if (color != null) return colorRuleVariantToBadgeVariant(color)
  return accent === true ? "accent" : "elevation-muted"
}
