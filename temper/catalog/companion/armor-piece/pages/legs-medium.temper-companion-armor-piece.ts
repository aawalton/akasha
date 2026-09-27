import type { TemperCompanionArmorPiece } from "akasha/temper/catalog/companion/armor-piece/temper-companion-armor-piece.page-type.types.ts"

export const legsMedium = {
  id: "01a0e0bf-70b2-7018-a0fa-fb2a9c7a21ab",
  type: "page-type/temper-companion-armor-piece",
  slug: "legs-medium",
  title: "Guards",
  companionArmorSlot: "temper-companion-armor-slot/legs",
  companionArmorWeight: "temper-companion-armor-weight/medium",
  ttcItemId: 23540,
} as const satisfies TemperCompanionArmorPiece
