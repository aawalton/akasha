import type { TemperCompanionArmorWeight } from "akasha/temper/catalog/companion/armor-weight/temper-companion-armor-weight.page-type.types.ts"

export const light = {
  id: "01a0debf-7166-720d-acd2-1226ad42cca2",
  type: "page-type/temper-companion-armor-weight",
  slug: "light",
  key: "light",
  title: "Light",
  hashPlace: 1,
  armorType: 1,
  armorPassiveId: "temper-companion-skill/all-shared-flow",
  armorSkillLineId: "temper-companion-skill-line/armor-light",
} as const satisfies TemperCompanionArmorWeight
