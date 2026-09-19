import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const sabrinaCarpenterSugarTalking = {
  id: "01a0b723-da74-7dbc-9123-299f0c2e35c3",
  type: "page-type/song",
  slug: "sabrina-carpenter-sugar-talking",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "faab019e-4d1e-4b8b-a3db-c7dd3c2c1657",
      externalLink: "https://musicbrainz.org/work/faab019e-4d1e-4b8b-a3db-c7dd3c2c1657",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Sugar Talking",
  artist: "artist/sabrina-carpenter",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
