import type { ValidSlots } from "akasha/temper/catalog/gear/thing/properties/valid-slots.one-of-property.types.ts"
import type { TemperGearThing } from "akasha/temper/catalog/gear/thing/temper-gear-thing.page-type.types.ts"
import type { Key } from "akasha/temper/thing/properties/key.text-property.types.ts"

export type TemperJewelryType = TemperGearThing & {
  key: Key
  validSlots: ValidSlots
}
