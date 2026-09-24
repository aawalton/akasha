import { badgeVariantForColor } from "akasha/design/interface/badge/modules/color-badge-variant/color-badge-variant.module.code.ts"
import type { PropertyDefinition } from "akasha/page/core/modules/page-data/page-data.module.code.ts"

const TEXT_BY_VARIANT: Readonly<Record<string, string>> = {
  green: "text-green",
  blue: "text-blue",
  purple: "text-purple",
  yellow: "text-yellow",
  orange: "text-orange",
  red: "text-red",
  surface: "text-primary",
  elevation: "text-primary",
  "elevation-muted": "text-secondary",
}

export function titleColorClass(
  definitions: readonly PropertyDefinition[],
  data: Readonly<Record<string, unknown>> | null | undefined
): string | null {
  const coloring = definitions.find((one) => one.colorsTitle === true)
  if (coloring === undefined || data == null) return null
  const held = data[coloring.id]
  if (typeof held !== "string") return null
  const variant = badgeVariantForColor(held)
  return variant == null ? null : (TEXT_BY_VARIANT[variant] ?? null)
}
