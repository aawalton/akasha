import type { TemperCompanionArmorPiece } from "akasha/temper/catalog/companion/armor-piece/temper-companion-armor-piece.page-type.types.ts"

export const waistLight = {
  id: "01a0e0bf-70b2-7014-b49a-157f59fc6a11",
  type: "page-type/temper-companion-armor-piece",
  slug: "waist-light",
  title: "Sash",
  companionArmorSlot: "temper-companion-armor-slot/waist",
  companionArmorWeight: "temper-companion-armor-weight/light",
  ttcItemId: 23537,
} as const satisfies TemperCompanionArmorPiece
