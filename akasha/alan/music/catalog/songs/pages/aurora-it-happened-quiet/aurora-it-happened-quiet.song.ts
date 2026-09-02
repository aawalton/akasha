import type { Song } from "../../song.page-type.ts"

export const auroraItHappenedQuiet = {
  id: "019ea4a5-d9a7-7099-82f9-f94ca1e3c293",
  pageTypeSlug: "song",
  slug: "aurora-it-happened-quiet",
  title: "It Happened Quiet",
  artistSlug: "aurora",
  externalId: "71e5c2f0-ff2e-4a84-8353-13136d39c405",
  externalLink: "https://musicbrainz.org/work/71e5c2f0-ff2e-4a84-8353-13136d39c405",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
