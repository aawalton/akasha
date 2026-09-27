import type { TemperCompanionArmorPiece } from "akasha/temper/catalog/companion/armor-piece/temper-companion-armor-piece.page-type.types.ts"

export const shouldersLight = {
  id: "01a0e0bf-70b2-700b-ab4a-44990f8bb5d1",
  type: "page-type/temper-companion-armor-piece",
  slug: "shoulders-light",
  title: "Epaulets",
  companionArmorSlot: "temper-companion-armor-slot/shoulders",
  companionArmorWeight: "temper-companion-armor-weight/light",
  ttcItemId: 23651,
} as const satisfies TemperCompanionArmorPiece
