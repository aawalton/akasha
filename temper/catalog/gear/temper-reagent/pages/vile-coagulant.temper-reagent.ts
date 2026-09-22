import type { TemperReagent } from "akasha/temper/catalog/gear/temper-reagent/temper-reagent.page-type.types.ts"

export const vileCoagulant = {
  id: "019e21f7-3b26-7c69-ace9-bedf3b87e28d",
  type: "page-type/temper-reagent",
  slug: "vile-coagulant",
  title: "Vile Coagulant",
  key: "vile-coagulant",
  icon: "resources/crafting_vile_coagula.png",
  itemId: 150670,
  alchemyEffects: [
    "temper-poison-effect/timidity",
    "temper-poison-effect/ravage-health",
    "temper-poison-effect/restore-magicka",
    "temper-poison-effect/protection",
  ],
} as const satisfies TemperReagent
