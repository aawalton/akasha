import type { Song } from "../../song.page-type.ts"

export const taylorSwiftSeven = {
  id: "019ea416-31ee-7c82-b530-1d2690389274",
  pageTypeSlug: "song",
  slug: "taylor-swift-seven",
  title: "seven",
  artistSlug: "taylor-swift",
  externalId: "3ff83ae5-845a-4cc7-a794-06c1be11f647",
  externalLink: "https://musicbrainz.org/work/3ff83ae5-845a-4cc7-a794-06c1be11f647",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
