import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const sabrinaCarpenterExhale = {
  id: "01a0b723-cb61-7d3c-88a2-9d756d418ab0",
  type: "page-type/song",
  slug: "sabrina-carpenter-exhale",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "a800c6cf-29f1-453b-aade-98b904f17bfa",
      externalLink: "https://musicbrainz.org/work/a800c6cf-29f1-453b-aade-98b904f17bfa",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Exhale",
  artist: "artist/sabrina-carpenter",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
