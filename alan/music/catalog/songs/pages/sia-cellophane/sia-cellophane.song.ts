import type { Song } from "../../song.page-type.ts"

export const siaCellophane = {
  id: "019ea4c4-0eaf-7087-84e6-640106d66fe4",
  pageTypeSlug: "song",
  slug: "sia-cellophane",
  title: "Cellophane",
  artistSlug: "sia",
  externalId: "6a15767c-fb23-4710-adb3-806796f2f42d",
  externalLink: "https://musicbrainz.org/work/6a15767c-fb23-4710-adb3-806796f2f42d",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
