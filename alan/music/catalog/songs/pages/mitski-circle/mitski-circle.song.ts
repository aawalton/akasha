import type { Song } from "../../song.page-type.ts"

export const mitskiCircle = {
  id: "019f0e9f-3210-7235-b178-54e290e606e7",
  pageTypeSlug: "song",
  slug: "mitski-circle",
  title: "Circle",
  artistSlug: "mitski",
  externalId: "3ed5f457-1d4b-4fc2-beee-11f79f65e2d8",
  externalLink: "https://musicbrainz.org/work/3ed5f457-1d4b-4fc2-beee-11f79f65e2d8",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-28",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
