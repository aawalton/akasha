import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const sabrinaCarpenterGoodbye = {
  id: "01a0b723-cd50-7e61-9ad8-80c45c7aa7ce",
  type: "page-type/song",
  slug: "sabrina-carpenter-goodbye",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "c53ae84c-a450-42cb-b352-2fa374d76594",
      externalLink: "https://musicbrainz.org/work/c53ae84c-a450-42cb-b352-2fa374d76594",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Goodbye",
  artist: "artist/sabrina-carpenter",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
