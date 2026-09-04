import type { Song } from "../../song.page-type.ts"

export const arianaGrandeTime = {
  id: "019ea4e6-5ce8-73e0-ba22-63b6b9a02a45",
  pageTypeSlug: "song",
  slug: "ariana-grande-time",
  title: "Time",
  artistSlug: "ariana-grande",
  externalId: "8f587596-84b4-4583-b559-e43de0bd3718",
  externalLink: "https://musicbrainz.org/work/8f587596-84b4-4583-b559-e43de0bd3718",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
} as const satisfies Song
