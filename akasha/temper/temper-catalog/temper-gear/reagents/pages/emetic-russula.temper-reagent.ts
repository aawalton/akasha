import type { TemperReagent } from "../temper-reagent.page-type.ts"

export const emeticRussula = {
  id: "01a05fd8-a453-746f-9522-2f839fddceb5",
  pageTypeSlug: "temper-reagent",
  slug: "emetic-russula",
  title: "Emetic Russula",
  key: "emetic-russula",
  icon: "resources/emetic_russula_r1.png",
  itemId: 30151,
  alchemyEffects: ["ravage-health", "ravage-magicka", "ravage-stamina", "entrapment"],
} as const satisfies TemperReagent
