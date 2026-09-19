import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeNeverGetOverMe = {
  id: "01a0b76f-ee02-715e-9713-92742b248fc9",
  type: "page-type/song",
  slug: "ariana-grande-never-get-over-me",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "ef9754ec-70c3-43c5-9214-06b04911c060",
      externalLink: "https://musicbrainz.org/work/ef9754ec-70c3-43c5-9214-06b04911c060",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "never get over me",
  artist: "artist/ariana-grande",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
