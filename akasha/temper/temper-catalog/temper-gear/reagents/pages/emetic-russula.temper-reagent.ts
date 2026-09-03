import type { TemperReagent } from "../temper-reagent.page-type.ts"

export const emeticRussula = {
  id: "019e21f7-3b18-7e6e-835c-7568dfe11ec9",
  pageTypeSlug: "temper-reagent",
  slug: "emetic-russula",
  title: "Emetic Russula",
  key: "emetic-russula",
  icon: "resources/emetic_russula_r1.png",
  itemId: 30151,
  alchemyEffects: ["ravage-health", "ravage-magicka", "ravage-stamina", "entrapment"],
} as const satisfies TemperReagent
