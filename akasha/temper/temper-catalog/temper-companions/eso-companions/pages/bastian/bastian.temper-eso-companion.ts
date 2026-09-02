import type { TemperEsoCompanion } from "../../temper-eso-companion.page-type.ts"

export const bastian = {
  id: "01a05fcf-591e-7bc4-8cbd-17a4ac12d3bf",
  pageTypeSlug: "temper-eso-companion",
  slug: "bastian",
  key: "bastian",
  title: "Bastian Hallix",
  icon: "/esoui/art/icons/comp_bastian.dds",
  subtitle: "The Dragonknight",
  alliance: "daggerfall-covenant",
  esoCompanionId: 1,
  classPassiveId: "bastian-tough",
  passiveEffects: "jsonl",
} as const satisfies TemperEsoCompanion
