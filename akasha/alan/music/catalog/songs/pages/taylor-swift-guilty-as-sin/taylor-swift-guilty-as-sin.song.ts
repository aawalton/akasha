import type { Song } from "../../song.page-type.ts"

export const taylorSwiftGuiltyAsSin = {
  id: "019ea416-1e43-75a4-9e7a-e137f7100f59",
  pageTypeSlug: "song",
  slug: "taylor-swift-guilty-as-sin",
  title: "Guilty as Sin?",
  artistSlug: "taylor-swift",
  externalId: "47fd8538-8693-4dba-b5e3-df7f973d810b",
  externalLink: "https://musicbrainz.org/work/47fd8538-8693-4dba-b5e3-df7f973d810b",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
