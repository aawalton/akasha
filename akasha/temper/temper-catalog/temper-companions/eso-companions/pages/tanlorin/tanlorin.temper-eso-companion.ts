import type { TemperEsoCompanion } from "../../temper-eso-companion.page-type.ts"

export const tanlorin = {
  id: "01a05fcf-5920-7f59-aa2c-473354605a90",
  pageTypeSlug: "temper-eso-companion",
  slug: "tanlorin",
  key: "tanlorin",
  title: "Tanlorin",
  icon: "/esoui/art/icons/u44_companion_tanlorin.dds",
  subtitle: "The Soulweaver",
  alliance: "aldmeri-dominion",
  esoCompanionId: 12,
  classPassiveId: "tanlorin-spirited",
  passiveEffects: "jsonl",
} as const satisfies TemperEsoCompanion
