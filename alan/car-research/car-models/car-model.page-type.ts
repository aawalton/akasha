import type { PageType } from "@akasha/pages-system/page-type"
import type { Title } from "../../../temper/temper-things/properties/title.text-property.ts"
import type { Car } from "../cars/car.page-type.ts"
import type { BodyStyle } from "./properties/body-style.text-property.ts"
import type { CarMakeSlug } from "./properties/car-make-slug.relation-property.ts"
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
  carMakeSlug: CarMakeSlug
}

export const carModel = {
  id: "01a0659a-4bc5-745f-bbb3-18171fb52343",
  pageTypeSlug: "page-type",
  slug: "car-model",
  definition: "a nameplate a make builds",
  pluralSlug: "car-models",
  extendsSlug: "page-type/car",
  partSlugs: [
    "relation-property/car-make-slug",
    "text-property/body-style",
    "text-property/generation",
    "text-property/model-years-available",
    "text-property/overview",
    "text-property/powertrain-options",
    "text-property/segment",
  ],
  properties: [
    { pagePropertySlug: "title", required: true, many: false },
    { pagePropertySlug: "body-style", required: true, many: false },
    { pagePropertySlug: "generation", required: true, many: false },
    { pagePropertySlug: "model-years-available", required: true, many: false },
    { pagePropertySlug: "overview", required: true, many: false },
    { pagePropertySlug: "powertrain-options", required: true, many: true, max: null },
    { pagePropertySlug: "segment", required: true, many: false },
    { pagePropertySlug: "car-make-slug", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A model names the make above it and never the years below.",
    },
  ],
} as const satisfies PageType
