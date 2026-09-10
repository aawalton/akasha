import type { Title } from "../../../../pages/properties/title.text-property.ts"
import type { CollectionExternal } from "../../../collections/externals/collection-external.page-type.types.ts"
import type { MaturityRating } from "./properties/maturity-rating.select-property.types.ts"

export type BookSeries = CollectionExternal & {
  title: Title
  maturityRating?: MaturityRating
}
