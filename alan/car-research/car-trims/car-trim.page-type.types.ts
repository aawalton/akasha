import type { Car } from "../cars/car.page-type.types.ts"
import type { CarYear } from "./properties/car-year.relation-property.types.ts"

export type CarTrim = Car & {
  carYear: CarYear
}
