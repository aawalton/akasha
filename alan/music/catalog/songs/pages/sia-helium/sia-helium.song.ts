import type { Song } from "../../song.page-type.ts"

export const siaHelium = {
  id: "019ea4c7-95fd-7fa7-9065-45c7f2d1cafd",
  pageTypeSlug: "song",
  slug: "sia-helium",
  title: "Helium",
  artistSlug: "sia",
  externalId: "409a4e77-d377-4b6c-acf8-0c29fcd6e8dc",
  externalLink: "https://musicbrainz.org/work/409a4e77-d377-4b6c-acf8-0c29fcd6e8dc",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
