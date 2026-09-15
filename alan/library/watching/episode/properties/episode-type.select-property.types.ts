import type { episodeType } from "akasha/alan/library/watching/episode/properties/episode-type.select-property.ts"

export type EpisodeType = (typeof episodeType.values)[number]
