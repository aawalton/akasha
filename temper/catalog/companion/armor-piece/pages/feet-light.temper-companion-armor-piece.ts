import type { TemperCompanionArmorPiece } from "akasha/temper/catalog/companion/armor-piece/temper-companion-armor-piece.page-type.types.ts"

export const feetLight = {
  id: "01a0e0bf-70b2-701a-8356-244271decccd",
  type: "page-type/temper-companion-armor-piece",
  slug: "feet-light",
  title: "Shoes",
  companionArmorSlot: "temper-companion-armor-slot/feet",
  companionArmorWeight: "temper-companion-armor-weight/light",
  ttcItemId: 23520,
} as const satisfies TemperCompanionArmorPiece
