import type { TemperReagent } from "../temper-reagent.page-type.ts"

export const stinkhorn = {
  id: "01a05fd8-a457-7a01-9215-6633d7115c15",
  pageTypeSlug: "temper-reagent",
  slug: "stinkhorn",
  title: "Stinkhorn",
  key: "stinkhorn",
  icon: "resources/stinkhorn_cap_r1.png",
  itemId: 30149,
  alchemyEffects: ["fracture", "ravage-health", "increase-weapon-power", "ravage-stamina"],
} as const satisfies TemperReagent
