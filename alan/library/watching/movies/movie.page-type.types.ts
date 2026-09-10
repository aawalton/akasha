import type { CollectionExternal } from "../../../../collections/externals/collection-external.page-type.types.ts"
import type { Title } from "../../../../pages/properties/title.text-property.ts"
import type { Genres } from "../properties/genres.text-property.ts"
import type { ImdbId } from "../properties/imdb-id.text-property.ts"
import type { PosterPath } from "../properties/poster-path.text-property.ts"
import type { ProductionStatus } from "../properties/production-status.select-property.ts"
import type { VoteAverage } from "../properties/vote-average.number-property.ts"

export type Movie = CollectionExternal & {
  title: Title
  genres?: Genres
  imdbId?: ImdbId
  posterPath?: PosterPath
  productionStatus?: ProductionStatus
  voteAverage?: VoteAverage
}
