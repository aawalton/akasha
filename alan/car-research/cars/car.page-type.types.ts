import type { ExclusionReason } from "akasha/alan/car-research/cars/properties/exclusion-reason.text-property.types.ts"
import type { ShortList } from "akasha/alan/car-research/cars/properties/short-list.boolean-property.types.ts"
import type { Sources } from "akasha/alan/car-research/cars/properties/sources.text-property.types.ts"
import type { Page } from "akasha/pages/page.page-type.types.ts"
import type { Title } from "akasha/pages/properties/title.text-property.types.ts"

export type Car = Page & {
  title: Title
  shortList?: ShortList
  sources?: Sources
  exclusionReason?: ExclusionReason
}
