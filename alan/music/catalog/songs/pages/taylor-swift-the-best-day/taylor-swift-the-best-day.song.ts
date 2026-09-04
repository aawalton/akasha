import type { Song } from "../../song.page-type.ts"

export const taylorSwiftTheBestDay = {
  id: "019ea416-40e9-7a5b-9a00-31dd37cbf3b3",
  pageTypeSlug: "song",
  slug: "taylor-swift-the-best-day",
  title: "The Best Day",
  artistSlug: "taylor-swift",
  externalId: "f1921180-ce7d-356a-91df-0422b3c71d16",
  externalLink: "https://musicbrainz.org/work/f1921180-ce7d-356a-91df-0422b3c71d16",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
