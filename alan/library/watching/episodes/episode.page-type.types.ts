import type { CollectionExternal } from "../../../../collections/externals/collection-external.page-type.types.ts"
import type { Title } from "../../../../pages/properties/title.text-property.ts"
import type { VoteAverage } from "../properties/vote-average.number-property.ts"
import type { EpisodeType } from "./properties/episode-type.select-property.ts"
import type { StillPath } from "./properties/still-path.text-property.ts"

export type Episode = CollectionExternal & {
  title: Title
  episodeType?: EpisodeType
  stillPath?: StillPath
  voteAverage?: VoteAverage
}
