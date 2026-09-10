import type { Car } from "../cars/car.page-type.types.ts"
import type { BodyStyle } from "./properties/body-style.text-property.ts"
import type { CarMake } from "./properties/car-make.relation-property.ts"
import type { Generation } from "./properties/generation.text-property.ts"
import type { ModelYearsAvailable } from "./properties/model-years-available.text-property.ts"
import type { Overview } from "./properties/overview.text-property.ts"
import type { PowertrainOptions } from "./properties/powertrain-options.text-property.ts"
import type { Segment } from "./properties/segment.text-property.ts"

export type CarModel = Car & {
  bodyStyle: BodyStyle
  generation: Generation
  modelYearsAvailable: ModelYearsAvailable
  overview: Overview
  powertrainOptions: PowertrainOptions
  segment: Segment
  carMake: CarMake
}
