import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jessicaBaioNaturally = {
  id: "019ea4f8-3fca-7e73-8735-3c4d57850fec",
  type: "page-type/song",
  slug: "jessica-baio-naturally",
  title: "naturally",
  artist: "artist/jessica-baio",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "197e59af-dba1-4da5-a98d-7ed875eede50",
      externalLink: "https://musicbrainz.org/recording/197e59af-dba1-4da5-a98d-7ed875eede50",
      lastSyncedAt: "2026-06-08",
    },
  ],
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
