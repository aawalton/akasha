import type { Song } from "../../song.page-type.ts"

export const taylorSwiftClean = {
  id: "019ea416-06c6-7945-bbee-dfce8111f85f",
  pageTypeSlug: "song",
  slug: "taylor-swift-clean",
  title: "Clean",
  artistSlug: "taylor-swift",
  externalId: "3e70b356-83a0-4fbf-8df4-3e5755c6d9fe",
  externalLink: "https://musicbrainz.org/work/3e70b356-83a0-4fbf-8df4-3e5755c6d9fe",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
