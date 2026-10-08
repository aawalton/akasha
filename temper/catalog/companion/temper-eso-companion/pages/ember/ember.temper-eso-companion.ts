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
  firstName: "Ember",
  passiveEffects: "jsonl",
  companionQuests: "jsonl",
  rapportDailies: "jsonl",
  hashPlace: 3,
  createdAt: "2026-09-02T01:50:19.423Z",
  updatedAt: "2026-09-27T03:32:13.000Z",
} as const satisfies TemperEsoCompanion
