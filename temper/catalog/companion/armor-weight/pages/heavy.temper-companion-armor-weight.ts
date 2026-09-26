import type { TemperCompanionArmorWeight } from "akasha/temper/catalog/companion/armor-weight/temper-companion-armor-weight.page-type.types.ts"

export const heavy = {
  id: "01a0debf-7165-739b-932c-b5ac032c5ca0",
  type: "page-type/temper-companion-armor-weight",
  slug: "heavy",
  key: "heavy",
  title: "Heavy",
  hashPlace: 3,
  armorType: 3,
  armorPassiveId: "temper-companion-skill/all-shared-firmness",
  armorSkillLineId: "temper-companion-skill-line/armor-heavy",
} as const satisfies TemperCompanionArmorWeight
