import type { Song } from "../../song.page-type.ts"

export const billieEilishLostCause = {
  id: "019ea4a9-9402-7d2e-bcc7-567f115cb59c",
  pageTypeSlug: "song",
  slug: "billie-eilish-lost-cause",
  title: "Lost Cause",
  artistSlug: "billie-eilish",
  externalId: "564cd0a0-b3b3-4740-ad23-16798c1b791a",
  externalLink: "https://musicbrainz.org/work/564cd0a0-b3b3-4740-ad23-16798c1b791a",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
