import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const sabrinaCarpenterGoGoJuice = {
  id: "01a0b723-c8ee-7ad8-8d6c-670f4f0dbed8",
  type: "page-type/song",
  slug: "sabrina-carpenter-go-go-juice",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "81d88f5a-cf50-49fa-86d4-66f87a0e68b3",
      externalLink: "https://musicbrainz.org/work/81d88f5a-cf50-49fa-86d4-66f87a0e68b3",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Go Go Juice",
  artist: "artist/sabrina-carpenter",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
