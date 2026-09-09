import type { PageType } from "@akasha/pages/page-type"
import type { Title } from "../../../pages/properties/title.text-property.ts"
import type { Car } from "../cars/car.page-type.types.ts"
import type { CarYear } from "./properties/car-year.relation-property.ts"

export type CarTrim = Car & {
  title: Title
  carYear: CarYear
}

export const carTrim = {
  id: "01a06827-645d-74f5-957f-25b077d85817",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "car-trim",
  definition: "one specification a model year is sold in",
  pluralSlug: "car-trims",
  extends: ["page-type/car"],
  parts: ["relation-property/car-year"],
  properties: [{ pageProperty: "relation-property/car-year", required: true, many: false }],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A trim names the year above that trim and is the last level of the catalogue.",
    },
    {
      invariantKind: "departure",
      statement: "A trim is a row in its make's file rather than a page filed on its own.",
    },
  ],
} as const satisfies PageType
