import type { Song } from "../../song.page-type.ts"

export const taylorSwiftCancelled = {
  id: "019ea416-11ce-70e9-a6cb-882b64621948",
  pageTypeSlug: "song",
  slug: "taylor-swift-cancelled",
  title: "CANCELLED!",
  artistSlug: "taylor-swift",
  externalId: "ac69f6dd-06b9-43db-ae1e-ed9847c2b44c",
  externalLink: "https://musicbrainz.org/work/ac69f6dd-06b9-43db-ae1e-ed9847c2b44c",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
