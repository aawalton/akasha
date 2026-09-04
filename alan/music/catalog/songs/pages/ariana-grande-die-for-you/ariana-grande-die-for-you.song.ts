import type { Song } from "../../song.page-type.ts"

export const arianaGrandeDieForYou = {
  id: "019ea4e2-7deb-745e-b864-bbf75c4ef90a",
  pageTypeSlug: "song",
  slug: "ariana-grande-die-for-you",
  title: "Die for You",
  artistSlug: "ariana-grande",
  externalId: "9f6b1fe4-458c-467c-88b6-39209961250f",
  externalLink: "https://musicbrainz.org/work/9f6b1fe4-458c-467c-88b6-39209961250f",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
