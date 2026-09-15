import type { BodyStyle } from "akasha/alan/car-research/car-model/properties/body-style.text-property.types.ts"
import type { CarMake } from "akasha/alan/car-research/car-model/properties/car-make.relation-property.types.ts"
import type { Generation } from "akasha/alan/car-research/car-model/properties/generation.text-property.types.ts"
import type { ModelYearsAvailable } from "akasha/alan/car-research/car-model/properties/model-years-available.text-property.types.ts"
import type { Overview } from "akasha/alan/car-research/car-model/properties/overview.text-property.types.ts"
import type { PowertrainOptions } from "akasha/alan/car-research/car-model/properties/powertrain-options.text-property.types.ts"
import type { Segment } from "akasha/alan/car-research/car-model/properties/segment.text-property.types.ts"
import type { Car } from "akasha/alan/car-research/car/car.page-type.types.ts"

export type CarModel = Car & {
  bodyStyle: BodyStyle
  generation: Generation
  modelYearsAvailable: ModelYearsAvailable
  overview: Overview
  powertrainOptions: PowertrainOptions
  segment: Segment
  carMake: CarMake
}
