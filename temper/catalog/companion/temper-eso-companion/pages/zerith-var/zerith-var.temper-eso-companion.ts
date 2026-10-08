import type { TemperEsoCompanion } from "akasha/temper/catalog/companion/temper-eso-companion/temper-eso-companion.page-type.types.ts"

export const zerithVar = {
  id: "01a05fcf-5921-7f8a-abd6-ebccbdc3b4f3",
  type: "page-type/temper-eso-companion",
  slug: "zerith-var",
  key: "zerith-var",
  title: "Zerith-var",
  icon: "/esoui/art/icons/u44_companion_zerith.dds",
  subtitle: "The Necromancer",
  alliance: "temper-alliance/aldmeri-dominion",
  esoCompanionId: 13,
  classPassiveId: "zerith-var-third-moons-chosen",
  firstName: "Zerith-var",
  passiveEffects: "jsonl",
  companionQuests: "jsonl",
  rapportDailies: "jsonl",
  hashPlace: 8,
  createdAt: "2026-09-02T01:50:19.425Z",
  updatedAt: "2026-09-27T03:32:13.000Z",
} as const satisfies TemperEsoCompanion
