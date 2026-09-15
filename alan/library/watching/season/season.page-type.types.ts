import type { CollectionExternal } from "akasha/alan/collection/external/collection-external.page-type.types.ts"
import type { PosterPath } from "akasha/alan/library/watching/properties/poster-path.text-property.types.ts"
import type { VoteAverage } from "akasha/alan/library/watching/properties/vote-average.number-property.types.ts"
import type { Title } from "akasha/page/properties/title.text-property.types.ts"

export type Season = CollectionExternal & {
  title: Title
  posterPath?: PosterPath
  voteAverage?: VoteAverage
}
