import type { TemperReagent } from "../temper-reagent.page-type.ts"

export const scribJelly = {
  id: "01a05fd8-a456-7be8-9086-057256962375",
  pageTypeSlug: "temper-reagent",
  slug: "scrib-jelly",
  title: "Scrib Jelly",
  key: "scrib-jelly",
  icon: "resources/reagent_scrib_jelly.png",
  itemId: 77589,
  alchemyEffects: ["ravage-magicka", "speed", "vulnerability", "lingering-health"],
} as const satisfies TemperReagent
