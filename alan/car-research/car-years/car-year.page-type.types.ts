import type { Car } from "../cars/car.page-type.types.ts"
import type { CarModel } from "./properties/car-model.relation-property.ts"
import type { ModelYear } from "./properties/model-year.number-property.ts"
import type { RefreshNotes } from "./properties/refresh-notes.text-property.ts"

export type CarYear = Car & {
  modelYear: ModelYear
  refreshNotes: RefreshNotes
  carModel: CarModel
}
