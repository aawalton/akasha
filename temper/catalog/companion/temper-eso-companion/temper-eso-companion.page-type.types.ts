import type { Alliance } from "akasha/temper/catalog/companion/temper-eso-companion/properties/alliance.relation-property.types.ts"
import type { ClassPassiveId } from "akasha/temper/catalog/companion/temper-eso-companion/properties/class-passive-id.text-property.types.ts"
import type { EsoCompanionId } from "akasha/temper/catalog/companion/temper-eso-companion/properties/eso-companion-id.number-property.types.ts"
import type { PassiveEffects } from "akasha/temper/catalog/companion/temper-eso-companion/properties/passive-effects.page-property-entry.types.ts"
import type { Subtitle } from "akasha/temper/catalog/companion/temper-eso-companion/properties/subtitle.text-property.types.ts"
import type { TemperCompanionThing } from "akasha/temper/catalog/companion/thing/temper-companion-thing.page-type.types.ts"
import type { Key } from "akasha/temper/thing/properties/key.text-property.types.ts"

export type TemperEsoCompanion = TemperCompanionThing & {
  key: Key
  subtitle?: Subtitle
  alliance: Alliance
  esoCompanionId: EsoCompanionId
  classPassiveId?: ClassPassiveId
  passiveEffects?: PassiveEffects
}
