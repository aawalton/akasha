import type { TemperEsoCompanion } from "akasha/temper/catalog/companion/temper-eso-companion/temper-eso-companion.page-type.types.ts"

export const sharpAsNight = {
  id: "01a05fcf-5920-7af5-a91a-352df51376f6",
  type: "page-type/temper-eso-companion",
  slug: "sharp-as-night",
  key: "sharp-as-night",
  title: "Sharp-as-Night",
  icon: "/esoui/art/icons/companion_sharp.dds",
  subtitle: "The Warden",
  alliance: "temper-alliance/ebonheart-pact",
  esoCompanionId: 8,
  classPassiveId: "sharp-survivalist",
  firstName: "Sharp-as-Night",
  passiveEffects: "jsonl",
  companionQuests: "jsonl",
  rapportDailies: "jsonl",
  hashPlace: 5,
  createdAt: "2026-09-02T01:50:19.424Z",
  updatedAt: "2026-09-27T03:32:13.000Z",
} as const satisfies TemperEsoCompanion
