import type { CollectionExternal } from "akasha/alan/collections/externals/collection-external.page-type.types.ts"
import type { ExternalId } from "akasha/alan/collections/externals/properties/external-id.text-property.ts"
import type { Artist } from "akasha/alan/music/catalog/songs/properties/artist.relation-property.types.ts"
import type { Insights } from "akasha/alan/music/catalog/songs/properties/insights.file-property.ts"
import type { Lyrics } from "akasha/alan/music/catalog/songs/properties/lyrics.file-property.ts"
import type { LyricsSource } from "akasha/alan/music/catalog/songs/properties/lyrics-source.text-property.ts"
import type { Performed } from "akasha/alan/music/catalog/songs/properties/performed.boolean-property.types.ts"
import type { PersonalConnections } from "akasha/alan/music/catalog/songs/properties/personal-connections.file-property.ts"
import type { Singability } from "akasha/alan/music/catalog/songs/properties/singability.rank-property.ts"
import type { SongType } from "akasha/alan/music/catalog/songs/properties/song-type.select-property.ts"
import type { SyncedLyrics } from "akasha/alan/music/catalog/songs/properties/synced-lyrics.file-property.ts"
import type { Written } from "akasha/alan/music/catalog/songs/properties/written.select-property.ts"
import type { Title } from "akasha/pages/properties/title.text-property.ts"

export type Song = CollectionExternal & {
  externalId: ExternalId
  title: Title
  artist: Artist
  songType: SongType
  performed: Performed
  lyricsSource?: LyricsSource
  written?: Written
  singability?: Singability
  lyrics?: Lyrics
  syncedLyrics?: SyncedLyrics
  insights?: Insights
  personalConnections?: PersonalConnections
}
