import type { TemperCompanionArmorPiece } from "akasha/temper/catalog/companion/armor-piece/temper-companion-armor-piece.page-type.types.ts"

export const waistHeavy = {
  id: "01a0e0bf-70b2-7016-ad55-c9f9aa20f3d8",
  type: "page-type/temper-companion-armor-piece",
  slug: "waist-heavy",
  title: "Girdle",
  companionArmorSlot: "temper-companion-armor-slot/waist",
  companionArmorWeight: "temper-companion-armor-weight/heavy",
  ttcItemId: 23418,
} as const satisfies TemperCompanionArmorPiece
