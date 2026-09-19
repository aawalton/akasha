import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const sabrinaCarpenterAlreadyOver = {
  id: "01a0b723-c456-795e-8103-137e44af40c0",
  type: "page-type/song",
  slug: "sabrina-carpenter-already-over",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "46fb46be-0e95-4676-a732-c788d32766ec",
      externalLink: "https://musicbrainz.org/work/46fb46be-0e95-4676-a732-c788d32766ec",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Already Over",
  artist: "artist/sabrina-carpenter",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
