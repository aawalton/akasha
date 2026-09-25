import type { CollectionExternal } from "akasha/alan/collection/external/collection-external.page-type.types.ts"
import type { Genres } from "akasha/alan/collection/watching/properties/genres.text-property.types.ts"
import type { ImdbId } from "akasha/alan/collection/watching/properties/imdb-id.text-property.types.ts"
import type { PosterPath } from "akasha/alan/collection/watching/properties/poster-path.text-property.types.ts"
import type { ProductionStatus } from "akasha/alan/collection/watching/properties/production-status.select-property.types.ts"
import type { VoteAverage } from "akasha/alan/collection/watching/properties/vote-average.number-property.types.ts"
import type { Title } from "akasha/page/properties/title.text-property.types.ts"

export type Movie = CollectionExternal & {
  title: Title
  genres?: Genres
  imdbId?: ImdbId
  posterPath?: PosterPath
  productionStatus?: ProductionStatus
  voteAverage?: VoteAverage
}
