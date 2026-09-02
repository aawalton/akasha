import type { Song } from "../../song.page-type.ts"

export const taylorSwiftParis = {
  id: "019ea416-33b8-71f1-93dd-1b1b518497a9",
  pageTypeSlug: "song",
  slug: "taylor-swift-paris",
  title: "Paris",
  artistSlug: "taylor-swift",
  externalId: "57af580f-4e62-4a5d-809d-3cd923b26a36",
  externalLink: "https://musicbrainz.org/work/57af580f-4e62-4a5d-809d-3cd923b26a36",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
