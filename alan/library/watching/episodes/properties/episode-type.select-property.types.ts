import type { episodeType } from "./episode-type.select-property.ts"

export type EpisodeType = (typeof episodeType.values)[number]
