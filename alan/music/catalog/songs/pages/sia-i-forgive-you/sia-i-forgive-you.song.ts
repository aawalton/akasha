import type { Song } from "../../song.page-type.ts"

export const siaIForgiveYou = {
  id: "019ea4c9-935c-743f-acf2-2b4ac958c488",
  pageTypeSlug: "song",
  slug: "sia-i-forgive-you",
  title: "I Forgive You",
  artistSlug: "sia",
  externalId: "ae3405a2-8dcb-4fb5-b7f8-2be993ac32e9",
  externalLink: "https://musicbrainz.org/work/ae3405a2-8dcb-4fb5-b7f8-2be993ac32e9",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
