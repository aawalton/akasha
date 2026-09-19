import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const sabrinaCarpenterOnMyWay = {
  id: "01a0b723-c947-73b7-a871-dfb7b7471ab1",
  type: "page-type/song",
  slug: "sabrina-carpenter-on-my-way",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "82c566c8-496e-4f03-a52d-86bd19eaad39",
      externalLink: "https://musicbrainz.org/work/82c566c8-496e-4f03-a52d-86bd19eaad39",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "On My Way",
  artist: "artist/sabrina-carpenter",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
