import type { TemperCompanionArmorPiece } from "akasha/temper/catalog/companion/armor-piece/temper-companion-armor-piece.page-type.types.ts"

export const waistMedium = {
  id: "01a0e0bf-70b2-7015-84f6-988d36d4f24c",
  type: "page-type/temper-companion-armor-piece",
  slug: "waist-medium",
  title: "Belt",
  companionArmorSlot: "temper-companion-armor-slot/waist",
  companionArmorWeight: "temper-companion-armor-weight/medium",
  ttcItemId: 23541,
} as const satisfies TemperCompanionArmorPiece
