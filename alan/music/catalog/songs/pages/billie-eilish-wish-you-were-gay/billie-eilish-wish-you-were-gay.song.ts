import type { Song } from "../../song.page-type.ts"

export const billieEilishWishYouWereGay = {
  id: "019ea4aa-2c18-7937-8e41-a63a52096720",
  pageTypeSlug: "song",
  slug: "billie-eilish-wish-you-were-gay",
  title: "wish you were gay",
  artistSlug: "billie-eilish",
  externalId: "7c1dcb26-7f80-45ef-9e10-df298df7b7bf",
  externalLink: "https://musicbrainz.org/work/7c1dcb26-7f80-45ef-9e10-df298df7b7bf",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
