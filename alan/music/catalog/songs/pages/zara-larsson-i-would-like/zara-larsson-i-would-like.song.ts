import type { Song } from "../../song.page-type.ts"

export const zaraLarssonIWouldLike = {
  id: "019ea4a2-7ee0-73c7-919b-4e814381d9b8",
  pageTypeSlug: "song",
  slug: "zara-larsson-i-would-like",
  title: "I Would Like",
  artistSlug: "zara-larsson",
  externalId: "fdaa6ab3-c017-4882-9543-98819379b3ae",
  externalLink: "https://musicbrainz.org/work/fdaa6ab3-c017-4882-9543-98819379b3ae",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
