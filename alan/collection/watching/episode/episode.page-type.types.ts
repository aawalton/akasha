import type { CollectionExternal } from "akasha/alan/collection/external/collection-external.page-type.types.ts"
import type { EpisodeType } from "akasha/alan/collection/watching/episode/properties/episode-type.select-property.types.ts"
import type { StillPath } from "akasha/alan/collection/watching/episode/properties/still-path.text-property.types.ts"
import type { VoteAverage } from "akasha/alan/collection/watching/properties/vote-average.number-property.types.ts"
import type { Title } from "akasha/page/properties/title.text-property.types.ts"

export type Episode = CollectionExternal & {
  title: Title
  episodeType?: EpisodeType
  stillPath?: StillPath
  voteAverage?: VoteAverage
}
