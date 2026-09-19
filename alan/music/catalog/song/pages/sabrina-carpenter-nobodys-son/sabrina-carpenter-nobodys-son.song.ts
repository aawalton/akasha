import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const sabrinaCarpenterNobodysSon = {
  id: "01a0b723-c056-7bf1-adac-0e1b350a128f",
  type: "page-type/song",
  slug: "sabrina-carpenter-nobodys-son",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "0cec1e59-7c15-45ce-bac1-02dd99639b8e",
      externalLink: "https://musicbrainz.org/work/0cec1e59-7c15-45ce-bac1-02dd99639b8e",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Nobody’s Son",
  artist: "artist/sabrina-carpenter",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
