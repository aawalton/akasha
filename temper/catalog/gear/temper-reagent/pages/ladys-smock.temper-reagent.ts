import type { TemperReagent } from "akasha/temper/catalog/gear/temper-reagent/temper-reagent.page-type.types.ts"

export const ladysSmock = {
  id: "019e21f7-3b1c-7253-87bc-fdf867a99938",
  type: "page-type/temper-reagent",
  slug: "ladys-smock",
  title: "Lady's Smock",
  key: "ladys-smock",
  icon: "resources/ladysmock.png",
  itemId: 30158,
  alchemyEffects: [
    "temper-poison-effect/increase-spell-power",
    "temper-poison-effect/restore-magicka",
    "temper-poison-effect/breach",
    "temper-poison-effect/spell-critical",
  ],
  createdAt: "2026-05-13T15:31:51.196Z",
  updatedAt: "2026-09-22T13:24:25.000Z",
} as const satisfies TemperReagent
