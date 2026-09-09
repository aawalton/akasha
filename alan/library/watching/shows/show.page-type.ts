import type { PageType } from "@akasha/pages/page-type"
import type { CollectionExternal } from "../../../../collections/externals/collection-external.page-type.ts"
import type { Title } from "../../../../pages/properties/title.text-property.ts"
import type { Genres } from "../properties/genres.text-property.ts"
import type { ImdbId } from "../properties/imdb-id.text-property.ts"
import type { PosterPath } from "../properties/poster-path.text-property.ts"
import type { ProductionStatus } from "../properties/production-status.select-property.ts"
import type { VoteAverage } from "../properties/vote-average.number-property.ts"
import type { LastAirDate } from "./properties/last-air-date.calendar-date-property.ts"

export type Show = CollectionExternal & {
  title: Title
  genres?: readonly Genres[]
  imdbId?: ImdbId
  lastAirDate?: LastAirDate
  posterPath?: PosterPath
  productionStatus?: ProductionStatus
  voteAverage?: VoteAverage
}

export const show = {
  id: "01a06599-ee09-7002-9418-3960f44ce6b4",
  pageTypeSlug: "page-type",
  slug: "show",
  definition: "a story told in episodes over seasons",
  pluralSlug: "shows",
  extends: ["page-type/collection-external"],
  parts: ["calendar-date-property/last-air-date"],
  properties: [
    { pageProperty: "text-property/title", required: true, many: false },
    { pageProperty: "text-property/genres", required: false, many: true, maxCount: null },
    { pageProperty: "text-property/imdb-id", required: false, many: false },
    { pageProperty: "calendar-date-property/last-air-date", required: false, many: false },
    { pageProperty: "text-property/poster-path", required: false, many: false },
    { pageProperty: "select-property/production-status", required: false, many: false },
    { pageProperty: "number-property/vote-average", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "How many seasons and episodes a show has is counted from its seasons.",
    },
    {
      invariantKind: "departure",
      statement: "A show's day of release is the day its first episode aired.",
    },
    {
      invariantKind: "departure",
      statement: "A show's length is summed from its seasons rather than stated.",
    },
  ],
} as const satisfies PageType
