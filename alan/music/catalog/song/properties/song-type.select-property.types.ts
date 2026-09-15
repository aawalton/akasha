import type { songType } from "akasha/alan/music/catalog/song/properties/song-type.select-property.ts"

export type SongType = (typeof songType.values)[number]
