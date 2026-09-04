import type { Song } from "../../song.page-type.ts"

export const taylorSwiftRonan = {
  id: "019ea416-3cb2-7503-9f7a-2e1b73bf8644",
  pageTypeSlug: "song",
  slug: "taylor-swift-ronan",
  title: "Ronan",
  artistSlug: "taylor-swift",
  externalId: "caecc528-1dbb-4228-bbbe-18f7d2da1982",
  externalLink: "https://musicbrainz.org/work/caecc528-1dbb-4228-bbbe-18f7d2da1982",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
