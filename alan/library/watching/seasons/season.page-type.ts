import type { PageType } from "@akasha/pages-system/page-type"
import type { CollectionExternal } from "../../../../collection-system/collection-externals/collection-external.page-type.ts"
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
  slug: "season",
  definition: "one run of a show's episodes",
  pluralSlug: "seasons",
  extendsSlug: "page-type/collection-external",
  partSlugs: [],
  properties: [
    { pagePropertySlug: "title", required: true, many: false },
    { pagePropertySlug: "poster-path", required: false, many: false },
    { pagePropertySlug: "vote-average", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The season numbered zero holds what sits outside the run.",
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
