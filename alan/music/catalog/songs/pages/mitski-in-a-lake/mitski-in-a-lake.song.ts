import type { Song } from "../../song.page-type.ts"

export const mitskiInALake = {
  id: "019f0ea8-c94a-76ac-8139-e25691a64f62",
  pageTypeSlug: "song",
  slug: "mitski-in-a-lake",
  title: "In a Lake",
  artistSlug: "mitski",
  externalId: "fe2c057d-a5f0-4abc-8fd0-e8796e38e41c",
  externalLink: "https://musicbrainz.org/work/fe2c057d-a5f0-4abc-8fd0-e8796e38e41c",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-28",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
