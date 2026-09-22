import type { TemperEsoCompanion } from "akasha/temper/catalog/companion/temper-eso-companion/temper-eso-companion.page-type.types.ts"

export const ember = {
  id: "01a05fcf-591f-76e5-bd82-41943a9f2a7a",
  type: "page-type/temper-eso-companion",
  slug: "ember",
  key: "ember",
  title: "Ember",
  icon: "/esoui/art/icons/comp_ember.dds",
  subtitle: "The Sorcerer",
  alliance: "temper-alliance/aldmeri-dominion",
  esoCompanionId: 5,
  classPassiveId: "ember-cunning",
  passiveEffects: "jsonl",
} as const satisfies TemperEsoCompanion
