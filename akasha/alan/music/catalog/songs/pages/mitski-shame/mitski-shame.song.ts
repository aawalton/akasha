import type { Song } from "../../song.page-type.ts"

export const mitskiShame = {
  id: "019f0ea4-2b86-7dde-89a5-a2ee9c6213d9",
  pageTypeSlug: "song",
  slug: "mitski-shame",
  title: "Shame",
  artistSlug: "mitski",
  externalId: "94e6fae5-9a90-4f8a-abe1-a9c5ec8e43f1",
  externalLink: "https://musicbrainz.org/work/94e6fae5-9a90-4f8a-abe1-a9c5ec8e43f1",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-28",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
