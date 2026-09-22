import type { TemperReagent } from "akasha/temper/catalog/gear/temper-reagent/temper-reagent.page-type.types.ts"

export const violetCoprinus = {
  id: "019e21f7-3b27-798b-a4d4-e37f887f6917",
  type: "page-type/temper-reagent",
  slug: "violet-coprinus",
  title: "Violet Coprinus",
  key: "violet-coprinus",
  icon: "resources/violet_coprinus_r1.png",
  itemId: 30152,
  alchemyEffects: [
    "temper-poison-effect/breach",
    "temper-poison-effect/ravage-health",
    "temper-poison-effect/increase-spell-power",
    "temper-poison-effect/ravage-magicka",
  ],
} as const satisfies TemperReagent
