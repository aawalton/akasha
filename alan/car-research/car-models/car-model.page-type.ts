import type { PageType } from "@akasha/pages/page-type"
import type { Title } from "../../../pages/properties/title.text-property.ts"
import type { Car } from "../cars/car.page-type.ts"
import type { BodyStyle } from "./properties/body-style.text-property.ts"
import type { CarMake } from "./properties/car-make.relation-property.ts"
import type { Generation } from "./properties/generation.text-property.ts"
import type { ModelYearsAvailable } from "./properties/model-years-available.text-property.ts"
import type { Overview } from "./properties/overview.text-property.ts"
import type { PowertrainOptions } from "./properties/powertrain-options.text-property.ts"
import type { Segment } from "./properties/segment.text-property.ts"

export type CarModel = Car & {
  title: Title
  bodyStyle: BodyStyle
  generation: Generation
  modelYearsAvailable: ModelYearsAvailable
  overview: Overview
  powertrainOptions: readonly PowertrainOptions[]
  segment: Segment
  carMake: CarMake
}

export const carModel = {
  id: "01a0659a-4bc5-745f-bbb3-18171fb52343",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "car-model",
  definition: "a nameplate a make builds",
  pluralSlug: "car-models",
  extends: ["page-type/car"],
  parts: [
    "relation-property/car-make",
    "text-property/body-style",
    "text-property/generation",
    "text-property/model-years-available",
    "text-property/overview",
    "text-property/powertrain-options",
    "text-property/segment",
  ],
  properties: [
    { pageProperty: "text-property/body-style", required: true, many: false },
    { pageProperty: "text-property/generation", required: true, many: false },
    { pageProperty: "text-property/model-years-available", required: true, many: false },
    { pageProperty: "text-property/overview", required: true, many: false },
    {
      pageProperty: "text-property/powertrain-options",
      required: true,
      many: true,
      maxCount: null,
    },
    { pageProperty: "text-property/segment", required: true, many: false },
    { pageProperty: "relation-property/car-make", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A model names the make above that model and never the years below.",
    },
  ],
} as const satisfies PageType
