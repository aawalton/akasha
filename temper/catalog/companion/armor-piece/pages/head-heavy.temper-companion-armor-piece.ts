import type { TemperCompanionArmorPiece } from "akasha/temper/catalog/companion/armor-piece/temper-companion-armor-piece.page-type.types.ts"

export const headHeavy = {
  id: "01a0e0bf-70b2-700a-80ab-7a1fa959daf7",
  type: "page-type/temper-companion-armor-piece",
  slug: "head-heavy",
  title: "Helm",
  companionArmorSlot: "temper-companion-armor-slot/head",
  companionArmorWeight: "temper-companion-armor-weight/heavy",
  ttcItemId: 23490,
} as const satisfies TemperCompanionArmorPiece
