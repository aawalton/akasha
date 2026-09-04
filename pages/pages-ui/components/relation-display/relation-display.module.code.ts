import { colorRuleVariantToBadgeVariant } from "@akasha/pages-core/color-rules"
import type { BadgeVariant, ColorRuleVariant } from "@akasha/pages-core/schema/color-rule"

export type RelationValue = string | { id: string; title: string }

export function getRelationId(value: RelationValue): string {
  return typeof value === "string" ? value : value.id
}

export function resolveRelationName(
  resolver: { resolve: (id: string) => { id: string; title: string } | null } | null,
  value: RelationValue
): string {
  if (typeof value === "object") return value.title !== "" ? value.title : "Untitled"
  if (!resolver) return value
  const entry = resolver.resolve(value)
  if (entry === null) return value
  return entry.title !== "" ? entry.title : "Untitled"
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
