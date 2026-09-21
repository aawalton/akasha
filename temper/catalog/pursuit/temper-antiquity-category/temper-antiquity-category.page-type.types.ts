import type { Antiquities } from "akasha/temper/catalog/pursuit/temper-antiquity-category/properties/antiquities.page-property-entry.types.ts"
import type { EsoAntiquityCategoryId } from "akasha/temper/catalog/pursuit/temper-antiquity-category/properties/eso-antiquity-category-id.number-property.types.ts"
import type { TemperPursuitThing } from "akasha/temper/catalog/pursuit/thing/temper-pursuit-thing.page-type.types.ts"

export type TemperAntiquityCategory = TemperPursuitThing & {
  esoAntiquityCategoryId: EsoAntiquityCategoryId
  antiquities: Antiquities
}
