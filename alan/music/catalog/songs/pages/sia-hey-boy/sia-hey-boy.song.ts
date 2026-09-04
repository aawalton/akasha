import type { Song } from "../../song.page-type.ts"

export const siaHeyBoy = {
  id: "019ea4c8-32ed-71af-890a-e2edbe0a1747",
  pageTypeSlug: "song",
  slug: "sia-hey-boy",
  title: "Hey Boy",
  artistSlug: "sia",
  externalId: "6c6aa30c-3c6d-4861-9f08-26666a610dc7",
  externalLink: "https://musicbrainz.org/work/6c6aa30c-3c6d-4861-9f08-26666a610dc7",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
