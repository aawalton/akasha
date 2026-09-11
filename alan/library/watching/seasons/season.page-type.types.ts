import type { CollectionExternal } from "akasha/alan/collections/externals/collection-external.page-type.types.ts"
import type { PosterPath } from "akasha/alan/library/watching/properties/poster-path.text-property.ts"
import type { VoteAverage } from "akasha/alan/library/watching/properties/vote-average.number-property.types.ts"
import type { Title } from "akasha/pages/properties/title.text-property.ts"

export type Season = CollectionExternal & {
  title: Title
  posterPath?: PosterPath
  voteAverage?: VoteAverage
}
