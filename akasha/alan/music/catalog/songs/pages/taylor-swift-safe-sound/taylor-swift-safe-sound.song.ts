import type { Song } from "../../song.page-type.ts"

export const taylorSwiftSafeSound = {
  id: "019ea416-35c9-76aa-9dfc-56f943ccfb37",
  pageTypeSlug: "song",
  slug: "taylor-swift-safe-sound",
  title: "Safe & Sound",
  artistSlug: "taylor-swift",
  externalId: "63899fdd-242f-4e29-a3cd-d3fbfb98f333",
  externalLink: "https://musicbrainz.org/work/63899fdd-242f-4e29-a3cd-d3fbfb98f333",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
