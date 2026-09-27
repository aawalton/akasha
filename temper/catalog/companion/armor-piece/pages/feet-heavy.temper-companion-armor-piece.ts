import type { TemperCompanionArmorPiece } from "akasha/temper/catalog/companion/armor-piece/temper-companion-armor-piece.page-type.types.ts"

export const feetHeavy = {
  id: "01a0e0bf-70b2-701c-a724-5f5f155f1b9e",
  type: "page-type/temper-companion-armor-piece",
  slug: "feet-heavy",
  title: "Sabatons",
  companionArmorSlot: "temper-companion-armor-slot/feet",
  companionArmorWeight: "temper-companion-armor-weight/heavy",
  ttcItemId: 23405,
} as const satisfies TemperCompanionArmorPiece
