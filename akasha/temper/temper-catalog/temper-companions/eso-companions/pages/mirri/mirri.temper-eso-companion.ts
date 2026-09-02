import type { TemperEsoCompanion } from "../../temper-eso-companion.page-type.ts"

export const mirri = {
  id: "01a05fcf-591f-7e8b-a141-57ddd4ae8373",
  pageTypeSlug: "temper-eso-companion",
  slug: "mirri",
  key: "mirri",
  title: "Mirri Elendis",
  icon: "/esoui/art/icons/comp_mirri.dds",
  subtitle: "The Nightblade",
  alliance: "ebonheart-pact",
  esoCompanionId: 2,
  classPassiveId: "mirri-dynamic",
  passiveEffects: "jsonl",
} as const satisfies TemperEsoCompanion
