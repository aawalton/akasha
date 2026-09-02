import type { TemperReagent } from "../temper-reagent.page-type.ts"

export const violetCoprinus = {
  id: "01a05fd8-a457-7a89-8032-5e534d08a44a",
  pageTypeSlug: "temper-reagent",
  slug: "violet-coprinus",
  title: "Violet Coprinus",
  key: "violet-coprinus",
  icon: "resources/violet_coprinus_r1.png",
  itemId: 30152,
  alchemyEffects: ["breach", "ravage-health", "increase-spell-power", "ravage-magicka"],
} as const satisfies TemperReagent
