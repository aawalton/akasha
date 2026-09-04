import type { Song } from "../../song.page-type.ts"

export const arianaGrandeWonderful = {
  id: "019ea4e5-7535-7e47-895f-7d5310cb8d53",
  pageTypeSlug: "song",
  slug: "ariana-grande-wonderful",
  title: "Wonderful",
  artistSlug: "ariana-grande",
  externalId: "60f57d98-4955-4bd4-be63-94dcaa63d6db",
  externalLink: "https://musicbrainz.org/work/60f57d98-4955-4bd4-be63-94dcaa63d6db",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
