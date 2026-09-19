import type { trackType } from "akasha/alan/music/catalog/track/properties/track-type.select-property.ts"

export type TrackType = (typeof trackType.values)[number]
