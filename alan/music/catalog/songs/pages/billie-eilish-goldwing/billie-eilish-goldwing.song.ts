import type { Song } from "../../song.page-type.ts"

export const billieEilishGoldwing = {
  id: "019ea4a9-4afd-769c-b924-137eb4c66f04",
  pageTypeSlug: "song",
  slug: "billie-eilish-goldwing",
  title: "GOLDWING",
  artistSlug: "billie-eilish",
  externalId: "4a145f8d-bf24-4497-a41d-e7947346b5a4",
  externalLink: "https://musicbrainz.org/work/4a145f8d-bf24-4497-a41d-e7947346b5a4",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
