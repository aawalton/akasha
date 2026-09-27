import type { TemperCompanionArmorPiece } from "akasha/temper/catalog/companion/armor-piece/temper-companion-armor-piece.page-type.types.ts"

export const chestMedium = {
  id: "01a0e0bf-70b2-700f-b0e9-f1cf013c9ca1",
  type: "page-type/temper-companion-armor-piece",
  slug: "chest-medium",
  title: "Jack",
  companionArmorSlot: "temper-companion-armor-slot/chest",
  companionArmorWeight: "temper-companion-armor-weight/medium",
  ttcItemId: 23467,
} as const satisfies TemperCompanionArmorPiece
