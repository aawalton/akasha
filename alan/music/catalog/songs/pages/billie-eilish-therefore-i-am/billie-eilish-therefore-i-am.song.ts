import type { Song } from "../../song.page-type.ts"

export const billieEilishThereforeIAm = {
  id: "019ea4a8-e5c3-7983-8a74-1e1a4529a345",
  pageTypeSlug: "song",
  slug: "billie-eilish-therefore-i-am",
  title: "Therefore I Am",
  artistSlug: "billie-eilish",
  externalId: "35117fd6-7860-48d5-8d33-4731b13c3816",
  externalLink: "https://musicbrainz.org/work/35117fd6-7860-48d5-8d33-4731b13c3816",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
