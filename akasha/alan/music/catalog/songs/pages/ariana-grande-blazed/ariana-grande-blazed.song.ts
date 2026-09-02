import type { Song } from "../../song.page-type.ts"

export const arianaGrandeBlazed = {
  id: "019ea4e3-04d6-76cc-87e7-89fba0351fb4",
  pageTypeSlug: "song",
  slug: "ariana-grande-blazed",
  title: "blazed",
  artistSlug: "ariana-grande",
  externalId: "c3cbd845-79bc-444f-89be-21b0ccdf2ee6",
  externalLink: "https://musicbrainz.org/work/c3cbd845-79bc-444f-89be-21b0ccdf2ee6",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
