import type { PageType } from "@akasha/pages-system/page-type"
import type { Title } from "../../../temper/temper-things/properties/title.text-property.ts"
import type { Car } from "../cars/car.page-type.ts"
import type { CarModelSlug } from "./properties/car-model-slug.relation-property.ts"
import type { ModelYear } from "./properties/modelYear.number-property.ts"
import type { RefreshNotes } from "./properties/refreshNotes.text-property.ts"

export type CarYear = Car & {
  title: Title
  modelYear: ModelYear
  refreshNotes: RefreshNotes
  carModelSlug: CarModelSlug
}

export const carYear = {
  id: "01a06599-35ba-7f72-a7a2-3726c858dce5",
  pageTypeSlug: "page-type",
  slug: "car-year",
  definition: "one model year of a nameplate",
  pluralSlug: "car-years",
  extendsSlug: "page-type/car",
  partSlugs: [
    "number-property/modelYear",
    "relation-property/car-model-slug",
    "text-property/refreshNotes",
  ],
  properties: [
    { pagePropertySlug: "title", required: true, many: false },
    { pagePropertySlug: "modelYear", required: true, many: false },
    { pagePropertySlug: "refreshNotes", required: true, many: false },
    { pagePropertySlug: "car-model-slug", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A year names the model above it and never the trims below.",
    },
  ],
} as const satisfies PageType
