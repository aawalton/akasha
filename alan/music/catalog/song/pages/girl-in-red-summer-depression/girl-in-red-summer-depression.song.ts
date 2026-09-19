import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const girlInRedSummerDepression = {
  id: "01a0b724-d4b4-7a2a-a891-49e3304ee029",
  type: "page-type/song",
  slug: "girl-in-red-summer-depression",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "b6fc8f23-a5ae-4de2-abcb-d7b7db840a0b",
      externalLink: "https://musicbrainz.org/work/b6fc8f23-a5ae-4de2-abcb-d7b7db840a0b",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "summer depression",
  artist: "artist/girl-in-red",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
