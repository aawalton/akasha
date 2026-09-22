import type { TemperEsoCompanion } from "akasha/temper/catalog/companion/temper-eso-companion/temper-eso-companion.page-type.types.ts"

export const azandar = {
  id: "01a05fcf-591d-727b-bcd4-81688875cb62",
  type: "page-type/temper-eso-companion",
  slug: "azandar",
  key: "azandar",
  title: "Azandar",
  icon: "/esoui/art/icons/companion_azander.dds",
  subtitle: "The Arcanist",
  alliance: "temper-alliance/daggerfall-covenant",
  esoCompanionId: 9,
  classPassiveId: "azandar-son-of-kozanset",
  passiveEffects: "jsonl",
} as const satisfies TemperEsoCompanion
