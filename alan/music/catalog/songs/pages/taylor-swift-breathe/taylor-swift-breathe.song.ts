import type { Song } from "../../song.page-type.ts"

export const taylorSwiftBreathe = {
  id: "019ea416-0945-7c15-a995-d227ab5750aa",
  pageTypeSlug: "song",
  slug: "taylor-swift-breathe",
  title: "Breathe",
  artistSlug: "taylor-swift",
  externalId: "55e776e0-2d67-3c6c-b088-ee091ac63f5f",
  externalLink: "https://musicbrainz.org/work/55e776e0-2d67-3c6c-b088-ee091ac63f5f",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
