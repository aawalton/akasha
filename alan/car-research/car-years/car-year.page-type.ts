import type { PageType } from "@akasha/pages-system/page-type"
import type { Title } from "../../../pages/properties/title.text-property.ts"
import type { Car } from "../cars/car.page-type.ts"
import type { CarModelSlug } from "./properties/car-model-slug.relation-property.ts"
import type { ModelYear } from "./properties/model-year.number-property.ts"
import type { RefreshNotes } from "./properties/refresh-notes.text-property.ts"

export type CarYear = Car & {
  title: Title
  modelYear: ModelYear
  refreshNotes: RefreshNotes
  carModelSlug: CarModelSlug
}

export const carYear = {
  id: "01a0659d-2432-715e-b4e1-2cfa27018de7",
  pageTypeSlug: "page-type",
  slug: "car-year",
  definition: "one model year of a nameplate",
  pluralSlug: "car-years",
  extendsSlug: ["page-type/car"],
  partSlugs: [
    "number-property/model-year",
    "relation-property/car-model-slug",
    "text-property/refresh-notes",
  ],
  properties: [
    { pagePropertySlug: "title", required: true, many: false },
    { pagePropertySlug: "model-year", required: true, many: false },
    { pagePropertySlug: "refresh-notes", required: true, many: false },
    { pagePropertySlug: "car-model-slug", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A year names the model above it and never the trims below.",
    },
  ],
} as const satisfies PageType
