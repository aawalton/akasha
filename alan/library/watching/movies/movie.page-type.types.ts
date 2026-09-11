import type { CollectionExternal } from "akasha/alan/collections/externals/collection-external.page-type.types.ts"
import type { Genres } from "akasha/alan/library/watching/properties/genres.text-property.types.ts"
import type { ImdbId } from "akasha/alan/library/watching/properties/imdb-id.text-property.types.ts"
import type { PosterPath } from "akasha/alan/library/watching/properties/poster-path.text-property.types.ts"
import type { ProductionStatus } from "akasha/alan/library/watching/properties/production-status.select-property.types.ts"
import type { VoteAverage } from "akasha/alan/library/watching/properties/vote-average.number-property.types.ts"
import type { Title } from "akasha/pages/properties/title.text-property.types.ts"

export type Movie = CollectionExternal & {
  title: Title
  genres?: Genres
  imdbId?: ImdbId
  posterPath?: PosterPath
  productionStatus?: ProductionStatus
  voteAverage?: VoteAverage
}
