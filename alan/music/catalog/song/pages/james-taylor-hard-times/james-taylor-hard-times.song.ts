import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorHardTimes = {
  id: "01a0b72f-2c29-70ea-b284-99c1f824f78b",
  type: "page-type/song",
  slug: "james-taylor-hard-times",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "b39602bc-cad5-4e07-9f15-b39a7b5de443",
      externalLink: "https://musicbrainz.org/work/b39602bc-cad5-4e07-9f15-b39a7b5de443",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Hard Times",
  artist: "artist/james-taylor",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
