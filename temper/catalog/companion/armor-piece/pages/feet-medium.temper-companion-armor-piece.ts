import type { TemperCompanionArmorPiece } from "akasha/temper/catalog/companion/armor-piece/temper-companion-armor-piece.page-type.types.ts"

export const feetMedium = {
  id: "01a0e0bf-70b2-701b-bcc9-d87843b91db4",
  type: "page-type/temper-companion-armor-piece",
  slug: "feet-medium",
  title: "Boots",
  companionArmorSlot: "temper-companion-armor-slot/feet",
  companionArmorWeight: "temper-companion-armor-weight/medium",
  ttcItemId: 23495,
} as const satisfies TemperCompanionArmorPiece
