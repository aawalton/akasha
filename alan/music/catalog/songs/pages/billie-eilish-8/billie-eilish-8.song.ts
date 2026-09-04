import type { Song } from "../../song.page-type.ts"

export const billieEilish8 = {
  id: "019ea4ac-26c3-7f1d-856d-e160bd46cf1f",
  pageTypeSlug: "song",
  slug: "billie-eilish-8",
  title: "8",
  artistSlug: "billie-eilish",
  externalId: "ea39d187-f68d-432d-b975-8a8f5131b229",
  externalLink: "https://musicbrainz.org/work/ea39d187-f68d-432d-b975-8a8f5131b229",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
