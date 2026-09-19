import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const girlInRedYouNeedMeNow = {
  id: "01a0b724-d284-7262-8d69-6ee951cc2bfa",
  type: "page-type/song",
  slug: "girl-in-red-you-need-me-now",
  partOfCollections: ["artist/sabrina-carpenter"],
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "4830ab7c-46d0-46e7-be53-b6b224fa9509",
      externalLink: "https://musicbrainz.org/work/4830ab7c-46d0-46e7-be53-b6b224fa9509",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "You Need Me Now?",
  artist: "artist/girl-in-red",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
