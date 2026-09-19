import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const sabrinaCarpenterBusyWoman = {
  id: "01a0b723-c974-74ab-b409-f5bc4db0ad2d",
  type: "page-type/song",
  slug: "sabrina-carpenter-busy-woman",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "8687c0ac-c9ac-43f8-aa61-3473f94f3560",
      externalLink: "https://musicbrainz.org/work/8687c0ac-c9ac-43f8-aa61-3473f94f3560",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Busy Woman",
  artist: "artist/sabrina-carpenter",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
