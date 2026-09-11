import type { songType } from "akasha/alan/music/catalog/songs/properties/song-type.select-property.ts"

export type SongType = (typeof songType.values)[number]
