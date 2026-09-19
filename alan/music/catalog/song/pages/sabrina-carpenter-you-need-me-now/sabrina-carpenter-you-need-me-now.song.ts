import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const sabrinaCarpenterYouNeedMeNow = {
  id: "01a0b723-d3cd-73d8-adba-84847cc5f6d7",
  type: "page-type/song",
  slug: "sabrina-carpenter-you-need-me-now",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "4830ab7c-46d0-46e7-be53-b6b224fa9509",
      externalLink: "https://musicbrainz.org/work/4830ab7c-46d0-46e7-be53-b6b224fa9509",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "You Need Me Now?",
  artist: "artist/sabrina-carpenter",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
