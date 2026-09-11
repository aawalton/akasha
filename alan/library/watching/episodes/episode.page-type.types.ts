import type { CollectionExternal } from "akasha/alan/collections/externals/collection-external.page-type.types.ts"
import type { EpisodeType } from "akasha/alan/library/watching/episodes/properties/episode-type.select-property.types.ts"
import type { StillPath } from "akasha/alan/library/watching/episodes/properties/still-path.text-property.ts"
import type { VoteAverage } from "akasha/alan/library/watching/properties/vote-average.number-property.types.ts"
import type { Title } from "akasha/pages/properties/title.text-property.ts"

export type Episode = CollectionExternal & {
  title: Title
  episodeType?: EpisodeType
  stillPath?: StillPath
  voteAverage?: VoteAverage
}
