import type { Song } from "../../song.page-type.ts"

export const siaGenius2 = {
  id: "019ea4ca-3d8f-7c46-9960-ad7ca8e3eaa7",
  pageTypeSlug: "song",
  slug: "sia-genius-2",
  title: "Genius",
  artistSlug: "sia",
  externalId: "f1adb0b0-ee7d-48e7-9ea7-c76694729584",
  externalLink: "https://musicbrainz.org/work/f1adb0b0-ee7d-48e7-9ea7-c76694729584",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: false,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
