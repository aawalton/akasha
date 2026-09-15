import type { Car } from "akasha/alan/car-research/car/car.page-type.types.ts"
import type { CarYear } from "akasha/alan/car-research/car-trim/properties/car-year.relation-property.types.ts"

export type CarTrim = Car & {
  carYear: CarYear
}
