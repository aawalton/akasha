import type { TemperReagent } from "../temper-reagent.page-type.ts"

export const luminousRussula = {
  id: "01a05fd8-a454-781d-8ebb-0d7a37952c77",
  pageTypeSlug: "temper-reagent",
  slug: "luminous-russula",
  title: "Luminous Russula",
  key: "luminous-russula",
  icon: "resources/luminous_russula_r1.png",
  itemId: 30155,
  alchemyEffects: ["ravage-stamina", "maim", "restore-health", "hindrance"],
} as const satisfies TemperReagent
