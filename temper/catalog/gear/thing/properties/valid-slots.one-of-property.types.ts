import type { List } from "akasha/page/type/page-property/page-property.page-type.ts"
import type { ArmorSlot } from "akasha/temper/catalog/gear/temper-armor-slot/properties/armor-slot.relation-property.types.ts"
import type { JewelrySlot } from "akasha/temper/catalog/gear/temper-jewelry-slot/properties/jewelry-slot.relation-property.types.ts"
import type { WeaponSlot } from "akasha/temper/catalog/gear/temper-weapon-slot/properties/weapon-slot.relation-property.types.ts"

export type ValidSlots = List<ArmorSlot | WeaponSlot | JewelrySlot>
