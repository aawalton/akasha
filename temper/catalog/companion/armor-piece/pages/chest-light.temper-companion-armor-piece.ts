import type { TemperCompanionArmorPiece } from "akasha/temper/catalog/companion/armor-piece/temper-companion-armor-piece.page-type.types.ts"

export const chestLight = {
  id: "01a0e0bf-70b2-700e-b20c-ac74b99c80c8",
  type: "page-type/temper-companion-armor-piece",
  slug: "chest-light",
  title: "Robe",
  companionArmorSlot: "temper-companion-armor-slot/chest",
  companionArmorWeight: "temper-companion-armor-weight/light",
  ttcItemId: 23407,
} as const satisfies TemperCompanionArmorPiece
