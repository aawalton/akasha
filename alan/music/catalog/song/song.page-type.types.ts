import type { CollectionExternal } from "akasha/alan/collection/external/collection-external.page-type.types.ts"
import type { Artist } from "akasha/alan/music/catalog/song/properties/artist.relation-property.types.ts"
import type { Insights } from "akasha/alan/music/catalog/song/properties/insights.file-property.types.ts"
import type { Lyrics } from "akasha/alan/music/catalog/song/properties/lyrics.file-property.types.ts"
import type { LyricsSource } from "akasha/alan/music/catalog/song/properties/lyrics-source.text-property.types.ts"
import type { Performed } from "akasha/alan/music/catalog/song/properties/performed.boolean-property.types.ts"
import type { PersonalConnections } from "akasha/alan/music/catalog/song/properties/personal-connections.file-property.types.ts"
import type { Singability } from "akasha/alan/music/catalog/song/properties/singability.rank-property.types.ts"
import type { SyncedLyrics } from "akasha/alan/music/catalog/song/properties/synced-lyrics.file-property.types.ts"
import type { Written } from "akasha/alan/music/catalog/song/properties/written.select-property.types.ts"
import type { Title } from "akasha/page/properties/title.text-property.types.ts"

export type Song = CollectionExternal & {
  title: Title
  artist: Artist
  performed: Performed
  lyricsSource?: LyricsSource
  written?: Written
  singability?: Singability
  lyrics?: Lyrics
  syncedLyrics?: SyncedLyrics
  insights?: Insights
  personalConnections?: PersonalConnections
}
