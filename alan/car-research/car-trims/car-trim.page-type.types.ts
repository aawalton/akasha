import type { Car } from "../cars/car.page-type.types.ts"
import type { CarYear } from "./properties/car-year.relation-property.ts"

export type CarTrim = Car & {
  carYear: CarYear
}
