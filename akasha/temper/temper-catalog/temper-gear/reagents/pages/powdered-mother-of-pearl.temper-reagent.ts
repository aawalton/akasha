import type { TemperReagent } from "../temper-reagent.page-type.ts"

export const powderedMotherOfPearl = {
  id: "019e21f7-3b22-795b-861d-1ec33cba9bab",
  pageTypeSlug: "temper-reagent",
  slug: "powdered-mother-of-pearl",
  title: "Powdered Mother of Pearl",
  key: "powdered-mother-of-pearl",
  icon: "resources/reagent_scrib_powered_pearl.png",
  itemId: 139019,
  alchemyEffects: ["lingering-health", "speed", "vitality", "protection"],
} as const satisfies TemperReagent
