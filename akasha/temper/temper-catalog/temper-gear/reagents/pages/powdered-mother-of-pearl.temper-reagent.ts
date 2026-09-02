import type { TemperReagent } from "../temper-reagent.page-type.ts"

export const powderedMotherOfPearl = {
  id: "01a05fd8-a456-7b8f-9060-b2ec31886e24",
  pageTypeSlug: "temper-reagent",
  slug: "powdered-mother-of-pearl",
  title: "Powdered Mother of Pearl",
  key: "powdered-mother-of-pearl",
  icon: "resources/reagent_scrib_powered_pearl.png",
  itemId: 139019,
  alchemyEffects: ["lingering-health", "speed", "vitality", "protection"],
} as const satisfies TemperReagent
