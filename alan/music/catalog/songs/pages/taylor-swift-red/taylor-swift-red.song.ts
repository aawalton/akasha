import type { Song } from "../../song.page-type.ts"

export const taylorSwiftRed = {
  id: "019ea416-3252-7cca-8397-c63a34c4c25e",
  pageTypeSlug: "song",
  slug: "taylor-swift-red",
  title: "Red",
  artistSlug: "taylor-swift",
  externalId: "40d8c1f5-714d-4e36-8326-bb8300998ca7",
  externalLink: "https://musicbrainz.org/work/40d8c1f5-714d-4e36-8326-bb8300998ca7",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
