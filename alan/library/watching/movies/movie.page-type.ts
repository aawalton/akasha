import type { PageType } from "@akasha/pages-system/page-type"
import type { CollectionExternal } from "../../../../collection-system/collection-externals/collection-external.page-type.ts"
import type { Title } from "../../../../pages/pages/properties/title.text-property.ts"
import type { Genres } from "../properties/genres.text-property.ts"
import type { ImdbId } from "../properties/imdb-id.text-property.ts"
import type { PosterPath } from "../properties/poster-path.text-property.ts"
import type { ProductionStatus } from "../properties/production-status.select-property.ts"
import type { VoteAverage } from "../properties/vote-average.number-property.ts"

export type Movie = CollectionExternal & {
  title: Title
  genres?: readonly Genres[]
  imdbId?: ImdbId
  posterPath?: PosterPath
  productionStatus?: ProductionStatus
  voteAverage?: VoteAverage
}

export const movie = {
  id: "01a06599-ee09-7005-82e2-c1f83dc51c09",
  pageTypeSlug: "page-type",
  slug: "movie",
  definition: "a story told in one sitting",
  pluralSlug: "movies",
  extendsSlug: "page-type/collection-external",
  partSlugs: [],
  properties: [
    { pagePropertySlug: "title", required: true, many: false },
    { pagePropertySlug: "genres", required: false, many: true, max: null },
    { pagePropertySlug: "imdb-id", required: false, many: false },
    { pagePropertySlug: "poster-path", required: false, many: false },
    { pagePropertySlug: "production-status", required: false, many: false },
    { pagePropertySlug: "vote-average", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A film states the minutes the film runs to.",
    },
    {
      invariantKind: "departure",
      statement: "A film holds no parts.",
    },
  ],
} as const satisfies PageType
