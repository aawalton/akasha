import type { CarModel } from "akasha/alan/car-research/car-years/properties/car-model.relation-property.types.ts"
import type { ModelYear } from "akasha/alan/car-research/car-years/properties/model-year.number-property.types.ts"
import type { RefreshNotes } from "akasha/alan/car-research/car-years/properties/refresh-notes.text-property.ts"
import type { Car } from "akasha/alan/car-research/cars/car.page-type.types.ts"

export type CarYear = Car & {
  modelYear: ModelYear
  refreshNotes: RefreshNotes
  carModel: CarModel
}
