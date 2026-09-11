import type { CarYear } from "akasha/alan/car-research/car-trims/properties/car-year.relation-property.types.ts"
import type { Car } from "akasha/alan/car-research/cars/car.page-type.types.ts"

export type CarTrim = Car & {
  carYear: CarYear
}
