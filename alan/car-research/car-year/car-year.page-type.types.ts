import type { CarModel } from "akasha/alan/car-research/car-year/properties/car-model.relation-property.types.ts"
import type { ModelYear } from "akasha/alan/car-research/car-year/properties/model-year.number-property.types.ts"
import type { RefreshNotes } from "akasha/alan/car-research/car-year/properties/refresh-notes.text-property.types.ts"
import type { Car } from "akasha/alan/car-research/car/car.page-type.types.ts"

export type CarYear = Car & {
  modelYear: ModelYear
  refreshNotes: RefreshNotes
  carModel: CarModel
}
