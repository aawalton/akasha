import type { Song } from "../../song.page-type.ts"

export const taylorSwiftHitsDifferent = {
  id: "019ea416-2754-79ee-89a2-245426719948",
  pageTypeSlug: "song",
  slug: "taylor-swift-hits-different",
  title: "Hits Different",
  artistSlug: "taylor-swift",
  externalId: "a7b2ac6e-de04-469e-b983-6d6e79bd1c15",
  externalLink: "https://musicbrainz.org/work/a7b2ac6e-de04-469e-b983-6d6e79bd1c15",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
