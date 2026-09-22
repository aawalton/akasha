import type { Cooldown } from "akasha/temper/catalog/gear/temper-poison-effect/properties/cooldown.number-property.types.ts"
import type { IsPositive } from "akasha/temper/catalog/gear/temper-poison-effect/properties/is-positive.boolean-property.types.ts"
import type { Opposite } from "akasha/temper/catalog/gear/temper-poison-effect/properties/opposite.relation-property.types.ts"
import type { TemperGearThing } from "akasha/temper/catalog/gear/thing/temper-gear-thing.page-type.types.ts"
import type { Key } from "akasha/temper/thing/properties/key.text-property.types.ts"

export type TemperPoisonEffect = TemperGearThing & {
  key: Key
  opposite: Opposite
  isPositive?: IsPositive
  cooldown?: Cooldown
}
