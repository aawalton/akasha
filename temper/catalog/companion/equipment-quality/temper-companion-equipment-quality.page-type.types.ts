import type { TemperCompanionThing } from "akasha/temper/catalog/companion/thing/temper-companion-thing.page-type.types.ts"
import type { Available } from "akasha/temper/catalog/thing/properties/available.boolean-property.types.ts"
import type { DisplayOrder } from "akasha/temper/thing/properties/display-order.number-property.types.ts"
import type { Key } from "akasha/temper/thing/properties/key.text-property.types.ts"

export type TemperCompanionEquipmentQuality = TemperCompanionThing & {
  key: Key
  available: Available
  displayOrder: DisplayOrder
}
