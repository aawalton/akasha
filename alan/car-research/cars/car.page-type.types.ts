import type { Page } from "../../../pages/page.page-type.types.ts"
import type { Title } from "../../../pages/properties/title.text-property.ts"
import type { ExclusionReason } from "./properties/exclusion-reason.text-property.ts"
import type { ShortList } from "./properties/short-list.boolean-property.ts"
import type { Sources } from "./properties/sources.text-property.ts"

export type Car = Page & {
  title: Title
  shortList?: ShortList
  sources?: Sources
  exclusionReason?: ExclusionReason
}
