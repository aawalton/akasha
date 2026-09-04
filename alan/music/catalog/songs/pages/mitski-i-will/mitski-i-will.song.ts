import type { Song } from "../../song.page-type.ts"

export const mitskiIWill = {
  id: "019f0ea5-8737-730b-93b6-06edd77124f1",
  pageTypeSlug: "song",
  slug: "mitski-i-will",
  title: "I Will",
  artistSlug: "mitski",
  externalId: "b6b123f5-6f7d-4d88-bd90-f4b376f534bf",
  externalLink: "https://musicbrainz.org/work/b6b123f5-6f7d-4d88-bd90-f4b376f534bf",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-28",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
