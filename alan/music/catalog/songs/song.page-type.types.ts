import type { CollectionExternal } from "../../../../collections/externals/collection-external.page-type.types.ts"
import type { ExternalId } from "../../../../collections/externals/properties/external-id.text-property.ts"
import type { Title } from "../../../../pages/properties/title.text-property.ts"
import type { Artist } from "./properties/artist.relation-property.ts"
import type { Insights } from "./properties/insights.file-property.ts"
import type { Lyrics } from "./properties/lyrics.file-property.ts"
import type { LyricsSource } from "./properties/lyrics-source.text-property.ts"
import type { Performed } from "./properties/performed.boolean-property.ts"
import type { PersonalConnections } from "./properties/personal-connections.file-property.ts"
import type { Singability } from "./properties/singability.text-property.ts"
import type { SongType } from "./properties/song-type.text-property.ts"
import type { SyncedLyrics } from "./properties/synced-lyrics.file-property.ts"
import type { Written } from "./properties/written.text-property.ts"

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
