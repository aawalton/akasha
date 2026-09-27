import type { TemperCompanionArmorPiece } from "akasha/temper/catalog/companion/armor-piece/temper-companion-armor-piece.page-type.types.ts"

export const shouldersHeavy = {
  id: "01a0e0bf-70b2-700d-ab7f-2ccfba91453e",
  type: "page-type/temper-companion-armor-piece",
  slug: "shoulders-heavy",
  title: "Pauldrons",
  companionArmorSlot: "temper-companion-armor-slot/shoulders",
  companionArmorWeight: "temper-companion-armor-weight/heavy",
  ttcItemId: 23614,
} as const satisfies TemperCompanionArmorPiece
