import type { TemperReagent } from "../temper-reagent.page-type.ts"

export const violetCoprinus = {
  id: "019e21f7-3b27-798b-a4d4-e37f887f6917",
  pageTypeSlug: "temper-reagent",
  slug: "violet-coprinus",
  title: "Violet Coprinus",
  key: "violet-coprinus",
  icon: "resources/violet_coprinus_r1.png",
  itemId: 30152,
  alchemyEffects: ["breach", "ravage-health", "increase-spell-power", "ravage-magicka"],
} as const satisfies TemperReagent
