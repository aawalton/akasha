import type { Song } from "../../song.page-type.ts"

export const arianaGrandeResearch = {
  id: "019ea4e7-9aab-7a44-94f9-d232ce742ce8",
  pageTypeSlug: "song",
  slug: "ariana-grande-research",
  title: "Research",
  artistSlug: "ariana-grande",
  externalId: "d44bd5d3-75f2-4054-bda2-e2a4e432701b",
  externalLink: "https://musicbrainz.org/work/d44bd5d3-75f2-4054-bda2-e2a4e432701b",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
