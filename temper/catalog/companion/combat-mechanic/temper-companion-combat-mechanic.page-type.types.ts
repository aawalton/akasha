import type { MechanicValue } from "akasha/temper/catalog/companion/combat-mechanic/properties/mechanic-value.number-property.types.ts"
import type { TemperCompanionThing } from "akasha/temper/catalog/companion/thing/temper-companion-thing.page-type.types.ts"
import type { Key } from "akasha/temper/thing/properties/key.text-property.types.ts"

export type TemperCompanionCombatMechanic = TemperCompanionThing & {
  key: Key
  mechanicValue: MechanicValue
}
