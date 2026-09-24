import type { EsoAntiquitySetId } from "akasha/temper/catalog/pursuit/temper-antiquity-set/properties/eso-antiquity-set-id.number-property.types.ts"
import type { TemperPursuitThing } from "akasha/temper/catalog/pursuit/thing/temper-pursuit-thing.page-type.types.ts"

export type TemperAntiquitySet = TemperPursuitThing & {
  esoAntiquitySetId: EsoAntiquitySetId
}
