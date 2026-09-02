import type { Song } from "../../song.page-type.ts"

export const arianaGrandeOffTheTable = {
  id: "019ea4e4-de44-7ed6-9508-435a15d235d4",
  pageTypeSlug: "song",
  slug: "ariana-grande-off-the-table",
  title: "off the table",
  artistSlug: "ariana-grande",
  externalId: "4594fd4d-cfb5-417f-8b71-245df81fd8eb",
  externalLink: "https://musicbrainz.org/work/4594fd4d-cfb5-417f-8b71-245df81fd8eb",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
