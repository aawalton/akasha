import type { TemperCompanionArmorPiece } from "akasha/temper/catalog/companion/armor-piece/temper-companion-armor-piece.page-type.types.ts"

export const headLight = {
  id: "01a0e0bf-70b2-7008-a07e-83cc14ecba3e",
  type: "page-type/temper-companion-armor-piece",
  slug: "head-light",
  title: "Hat",
  companionArmorSlot: "temper-companion-armor-slot/head",
  companionArmorWeight: "temper-companion-armor-weight/light",
  ttcItemId: 23761,
} as const satisfies TemperCompanionArmorPiece
