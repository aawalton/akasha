import type { TemperCompanionArmorPiece } from "akasha/temper/catalog/companion/armor-piece/temper-companion-armor-piece.page-type.types.ts"

export const handsHeavy = {
  id: "01a0e0bf-70b2-7013-b21d-8300220369f8",
  type: "page-type/temper-companion-armor-piece",
  slug: "hands-heavy",
  title: "Gauntlets",
  companionArmorSlot: "temper-companion-armor-slot/hands",
  companionArmorWeight: "temper-companion-armor-weight/heavy",
  ttcItemId: 23732,
} as const satisfies TemperCompanionArmorPiece
