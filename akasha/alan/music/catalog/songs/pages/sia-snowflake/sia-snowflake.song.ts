import type { Song } from "../../song.page-type.ts"

export const siaSnowflake = {
  id: "019ea4ce-59ba-7af2-a853-817583522b35",
  pageTypeSlug: "song",
  slug: "sia-snowflake",
  title: "Snowflake",
  artistSlug: "sia",
  externalId: "e2bf6c43-a9f0-4c39-a01e-16835edf0c32",
  externalLink: "https://musicbrainz.org/work/e2bf6c43-a9f0-4c39-a01e-16835edf0c32",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
