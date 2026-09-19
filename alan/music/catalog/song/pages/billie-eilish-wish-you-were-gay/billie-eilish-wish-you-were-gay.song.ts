import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const billieEilishWishYouWereGay = {
  id: "019ea4aa-2c18-7937-8e41-a63a52096720",
  type: "page-type/song",
  slug: "billie-eilish-wish-you-were-gay",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "7c1dcb26-7f80-45ef-9e10-df298df7b7bf",
      externalLink: "https://musicbrainz.org/work/7c1dcb26-7f80-45ef-9e10-df298df7b7bf",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "wish you were gay",
  artist: "artist/billie-eilish",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
