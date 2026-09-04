import type { PageType } from "@akasha/pages-system/page-type"
import type { Title } from "../../../temper/temper-things/properties/title.text-property.ts"
import type { Car } from "../cars/car.page-type.ts"
import type { CarYearSlug } from "./properties/car-year-slug.relation-property.ts"

export type CarTrim = Car & {
  title: Title
  carYearSlug: CarYearSlug
}

export const carTrim = {
  id: "01a06827-645d-74f5-957f-25b077d85817",
  pageTypeSlug: "page-type",
  slug: "car-trim",
  definition: "one specification a model year is sold in",
  pluralSlug: "car-trims",
  extendsSlug: "page-type/car",
  partSlugs: ["relation-property/car-year-slug"],
  properties: [
    { pagePropertySlug: "title", required: true, many: false },
    { pagePropertySlug: "car-year-slug", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A trim names the year above it and is the last level of the catalogue.",
    },
    {
      invariantKind: "departure",
      statement: "A trim is a row in its make's file rather than a page filed on its own.",
    },
  ],
} as const satisfies PageType
