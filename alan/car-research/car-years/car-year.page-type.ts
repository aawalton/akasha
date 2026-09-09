import type { PageType } from "@akasha/pages/page-type"
import type { Title } from "../../../pages/properties/title.text-property.ts"
import type { Car } from "../cars/car.page-type.ts"
import type { CarModel } from "./properties/car-model.relation-property.ts"
import type { ModelYear } from "./properties/model-year.number-property.ts"
import type { RefreshNotes } from "./properties/refresh-notes.text-property.ts"

export type CarYear = Car & {
  title: Title
  modelYear: ModelYear
  refreshNotes: RefreshNotes
  carModel: CarModel
}

export const carYear = {
  id: "01a0659d-2432-715e-b4e1-2cfa27018de7",
  pageTypeSlug: "page-type",
  slug: "car-year",
  definition: "one model year of a nameplate",
  pluralSlug: "car-years",
  extends: ["page-type/car"],
  parts: [
    "number-property/model-year",
    "relation-property/car-model",
    "text-property/refresh-notes",
  ],
  properties: [
    { pageProperty: "number-property/model-year", required: true, many: false },
    { pageProperty: "text-property/refresh-notes", required: true, many: false },
    { pageProperty: "relation-property/car-model", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A year names the model above that year and never the trims below.",
    },
  ],
} as const satisfies PageType
