import type { Song } from "../../song.page-type.ts"

export const siaTheBully = {
  id: "019ea4ca-9674-78a7-aca6-7e7812d24e2b",
  pageTypeSlug: "song",
  slug: "sia-the-bully",
  title: "The Bully",
  artistSlug: "sia",
  externalId: "05c6307f-e6b2-389b-968e-526777a7fbae",
  externalLink: "https://musicbrainz.org/work/05c6307f-e6b2-389b-968e-526777a7fbae",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
