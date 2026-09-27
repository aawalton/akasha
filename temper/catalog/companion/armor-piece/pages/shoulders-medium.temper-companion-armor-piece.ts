import type { TemperCompanionArmorPiece } from "akasha/temper/catalog/companion/armor-piece/temper-companion-armor-piece.page-type.types.ts"

export const shouldersMedium = {
  id: "01a0e0bf-70b2-700c-9e20-9cd238f20976",
  type: "page-type/temper-companion-armor-piece",
  slug: "shoulders-medium",
  title: "Arm Cops",
  companionArmorSlot: "temper-companion-armor-slot/shoulders",
  companionArmorWeight: "temper-companion-armor-weight/medium",
  ttcItemId: 23757,
} as const satisfies TemperCompanionArmorPiece
