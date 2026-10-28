import type { AbilityEquations } from "akasha/temper/catalog/ability/properties/ability-equations.text-property.types.ts"
import type { TemperCatalogThing } from "akasha/temper/catalog/thing/temper-catalog-thing.page-type.types.ts"

export type TemperAbility = TemperCatalogThing & {
  equations?: AbilityEquations
}
