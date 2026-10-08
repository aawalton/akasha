import type { TemperEsoCompanion } from "akasha/temper/catalog/companion/temper-eso-companion/temper-eso-companion.page-type.types.ts"

export const tanlorin = {
  id: "01a05fcf-5920-7f59-aa2c-473354605a90",
  type: "page-type/temper-eso-companion",
  slug: "tanlorin",
  key: "tanlorin",
  title: "Tanlorin",
  icon: "/esoui/art/icons/u44_companion_tanlorin.dds",
  subtitle: "The Soulweaver",
  alliance: "temper-alliance/aldmeri-dominion",
  esoCompanionId: 12,
  classPassiveId: "tanlorin-spirited",
  firstName: "Tanlorin",
  passiveEffects: "jsonl",
  companionQuests: "jsonl",
  rapportDailies: "jsonl",
  hashPlace: 7,
  createdAt: "2026-09-02T01:50:19.424Z",
  updatedAt: "2026-09-27T03:32:13.000Z",
} as const satisfies TemperEsoCompanion
