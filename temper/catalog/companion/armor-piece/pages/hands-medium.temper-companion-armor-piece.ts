import type { TemperCompanionArmorPiece } from "akasha/temper/catalog/companion/armor-piece/temper-companion-armor-piece.page-type.types.ts"

export const handsMedium = {
  id: "01a0e0bf-70b2-7012-b123-d25c66a89a1b",
  type: "page-type/temper-companion-armor-piece",
  slug: "hands-medium",
  title: "Bracers",
  companionArmorSlot: "temper-companion-armor-slot/hands",
  companionArmorWeight: "temper-companion-armor-weight/medium",
  ttcItemId: 23719,
} as const satisfies TemperCompanionArmorPiece
