import type { PageType } from "@akasha/pages/page-type"
import type { CollectionExternal } from "../../../../collections/externals/collection-external.page-type.types.ts"
import type { Title } from "../../../../pages/properties/title.text-property.ts"
import type { PosterPath } from "../properties/poster-path.text-property.ts"
import type { VoteAverage } from "../properties/vote-average.number-property.ts"

export type Season = CollectionExternal & {
  title: Title
  posterPath?: PosterPath
  voteAverage?: VoteAverage
}

export const season = {
  id: "01a06599-ee09-7003-a52a-e6a01a72f7da",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "season",
  definition: "one run of a show's episodes",
  pluralSlug: "seasons",
  extends: ["page-type/collection-external"],
  parts: [],
  properties: [
    { pageProperty: "text-property/title", required: true, many: false },
    { pageProperty: "text-property/poster-path", required: false, many: false },
    { pageProperty: "number-property/vote-average", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The season numbered zero has the episodes sitting outside the run.",
    },
    {
      invariantKind: "departure",
      statement: "A season's length is summed from its episodes rather than stated.",
    },
    {
      invariantKind: "departure",
      statement: "A season's number is its position among the seasons of its show.",
    },
  ],
} as const satisfies PageType
