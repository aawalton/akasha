import type { BodyStyle } from "akasha/alan/car-research/car-models/properties/body-style.text-property.ts"
import type { CarMake } from "akasha/alan/car-research/car-models/properties/car-make.relation-property.types.ts"
import type { Generation } from "akasha/alan/car-research/car-models/properties/generation.text-property.ts"
import type { ModelYearsAvailable } from "akasha/alan/car-research/car-models/properties/model-years-available.text-property.ts"
import type { Overview } from "akasha/alan/car-research/car-models/properties/overview.text-property.ts"
import type { PowertrainOptions } from "akasha/alan/car-research/car-models/properties/powertrain-options.text-property.ts"
import type { Segment } from "akasha/alan/car-research/car-models/properties/segment.text-property.ts"
import type { Car } from "akasha/alan/car-research/cars/car.page-type.types.ts"

export type CarModel = Car & {
  bodyStyle: BodyStyle
  generation: Generation
  modelYearsAvailable: ModelYearsAvailable
  overview: Overview
  powertrainOptions: PowertrainOptions
  segment: Segment
  carMake: CarMake
}
