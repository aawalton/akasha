import type { TemperCompanionArmorPiece } from "akasha/temper/catalog/companion/armor-piece/temper-companion-armor-piece.page-type.types.ts"

export const chestHeavy = {
  id: "01a0e0bf-70b2-7010-aa23-f0e7effcf620",
  type: "page-type/temper-companion-armor-piece",
  slug: "chest-heavy",
  title: "Cuirass",
  companionArmorSlot: "temper-companion-armor-slot/chest",
  companionArmorWeight: "temper-companion-armor-weight/heavy",
  ttcItemId: 23459,
} as const satisfies TemperCompanionArmorPiece
