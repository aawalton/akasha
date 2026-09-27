import type { TemperCompanionArmorPiece } from "akasha/temper/catalog/companion/armor-piece/temper-companion-armor-piece.page-type.types.ts"

export const handsLight = {
  id: "01a0e0bf-70b2-7011-8bef-1e4ca7ac72a6",
  type: "page-type/temper-companion-armor-piece",
  slug: "hands-light",
  title: "Gloves",
  companionArmorSlot: "temper-companion-armor-slot/hands",
  companionArmorWeight: "temper-companion-armor-weight/light",
  ttcItemId: 23793,
} as const satisfies TemperCompanionArmorPiece
