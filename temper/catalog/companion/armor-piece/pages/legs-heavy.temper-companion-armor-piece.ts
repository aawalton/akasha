import type { TemperCompanionArmorPiece } from "akasha/temper/catalog/companion/armor-piece/temper-companion-armor-piece.page-type.types.ts"

export const legsHeavy = {
  id: "01a0e0bf-70b2-7019-89ae-72978fe28331",
  type: "page-type/temper-companion-armor-piece",
  slug: "legs-heavy",
  title: "Greaves",
  companionArmorSlot: "temper-companion-armor-slot/legs",
  companionArmorWeight: "temper-companion-armor-weight/heavy",
  ttcItemId: 23594,
} as const satisfies TemperCompanionArmorPiece
