import type { MetricDerived } from "akasha/story/mechanic/derived/metric-derived.page-type.types.ts"

export const towerPhysicalDefence = {
  id: "01a0ca38-5962-7c0e-9510-d5355b08f474",
  type: "page-type/metric-derived",
  slug: "tower-physical-defence",
  title: "Physical Defence",
  definition: "how well a character in the Tower turns a blow aside",
  formula: {},
} as const satisfies MetricDerived
