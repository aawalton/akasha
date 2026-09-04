import type { Song } from "../../song.page-type.ts"

export const mitskiGeyser = {
  id: "019f0ea2-d4dd-70d9-9369-945121d95255",
  pageTypeSlug: "song",
  slug: "mitski-geyser",
  title: "Geyser",
  artistSlug: "mitski",
  externalId: "83913eb5-6889-4d8a-85d8-19dc71f6a0c9",
  externalLink: "https://musicbrainz.org/work/83913eb5-6889-4d8a-85d8-19dc71f6a0c9",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-28",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
