import type { TemperEsoCompanion } from "akasha/temper/catalog/companion/temper-eso-companion/temper-eso-companion.page-type.types.ts"

export const isobel = {
  id: "01a05fcf-591f-7d0a-906f-b8555838244f",
  type: "page-type/temper-eso-companion",
  slug: "isobel",
  key: "isobel",
  title: "Isobel Veloise",
  icon: "/esoui/art/icons/comp_isobel.dds",
  subtitle: "The Templar",
  alliance: "temper-alliance/daggerfall-covenant",
  esoCompanionId: 6,
  classPassiveId: "isobel-enchanted",
  firstName: "Isobel",
  passiveEffects: "jsonl",
  companionQuests: "jsonl",
  rapportDailies: "jsonl",
  hashPlace: 4,
  createdAt: "2026-09-02T01:50:19.423Z",
  updatedAt: "2026-09-27T03:32:13.000Z",
} as const satisfies TemperEsoCompanion
