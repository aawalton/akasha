import type { TemperDebuffMinor } from "akasha/temper/catalog/effect/temper-debuff-minor/temper-debuff-minor.page-type.types.ts"

export const minorMangle = {
  id: "01a0d8e7-05c8-79fe-bb55-1846ff41774c",
  type: "page-type/temper-debuff-minor",
  slug: "minor-mangle",
  title: "Minor Mangle",
  key: "minor-mangle",
  description: "Reduces Max Health by 10%",
} as const satisfies TemperDebuffMinor
