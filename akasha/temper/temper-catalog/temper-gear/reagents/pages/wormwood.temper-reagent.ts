import type { TemperReagent } from "../temper-reagent.page-type.ts"

export const wormwood = {
  id: "01a05fd8-a458-78cc-a355-3a27631f0ec9",
  pageTypeSlug: "temper-reagent",
  slug: "wormwood",
  title: "Wormwood",
  key: "wormwood",
  icon: "resources/wormwood_r1.png",
  itemId: 30159,
  alchemyEffects: ["increase-weapon-crit", "hindrance", "detection", "unstoppable"],
} as const satisfies TemperReagent
