import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const sabrinaCarpenterCoincidence = {
  id: "01a0b723-c126-773b-bf03-80e8a9cd76d0",
  type: "page-type/song",
  slug: "sabrina-carpenter-coincidence",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "1feaba33-0971-4882-8faf-92aaba528d78",
      externalLink: "https://musicbrainz.org/work/1feaba33-0971-4882-8faf-92aaba528d78",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Coincidence",
  artist: "artist/sabrina-carpenter",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
