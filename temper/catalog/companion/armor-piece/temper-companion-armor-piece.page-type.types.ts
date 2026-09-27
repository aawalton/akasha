import type { PieceArmorSlot } from "akasha/temper/catalog/companion/armor-piece/properties/piece-armor-slot.relation-property.types.ts"
import type { PieceArmorWeight } from "akasha/temper/catalog/companion/armor-piece/properties/piece-armor-weight.relation-property.types.ts"
import type { TtcItemId } from "akasha/temper/catalog/companion/thing/properties/ttc-item-id.number-property.types.ts"
import type { TemperCompanionThing } from "akasha/temper/catalog/companion/thing/temper-companion-thing.page-type.types.ts"

export type TemperCompanionArmorPiece = TemperCompanionThing & {
  companionArmorSlot: PieceArmorSlot
  companionArmorWeight: PieceArmorWeight
  ttcItemId: TtcItemId
}
