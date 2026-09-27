import type { TemperCompanionArmorPiece } from "akasha/temper/catalog/companion/armor-piece/temper-companion-armor-piece.page-type.types.ts"

export const headMedium = {
  id: "01a0e0bf-70b2-7009-9a74-ca3b9c9fb12c",
  type: "page-type/temper-companion-armor-piece",
  slug: "head-medium",
  title: "Helmet",
  companionArmorSlot: "temper-companion-armor-slot/head",
  companionArmorWeight: "temper-companion-armor-weight/medium",
  ttcItemId: 23533,
} as const satisfies TemperCompanionArmorPiece
