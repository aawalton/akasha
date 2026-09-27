import type { TemperCompanionArmorPiece } from "akasha/temper/catalog/companion/armor-piece/temper-companion-armor-piece.page-type.types.ts"

export const legsLight = {
  id: "01a0e0bf-70b2-7017-be49-e5e985e12878",
  type: "page-type/temper-companion-armor-piece",
  slug: "legs-light",
  title: "Breeches",
  companionArmorSlot: "temper-companion-armor-slot/legs",
  companionArmorWeight: "temper-companion-armor-weight/light",
  ttcItemId: 23652,
} as const satisfies TemperCompanionArmorPiece
