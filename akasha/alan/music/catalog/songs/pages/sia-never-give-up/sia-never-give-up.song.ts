import type { Song } from "../../song.page-type.ts"

export const siaNeverGiveUp = {
  id: "019ea4c8-952e-7364-968f-e9803ccfc0b8",
  pageTypeSlug: "song",
  slug: "sia-never-give-up",
  title: "Never Give Up",
  artistSlug: "sia",
  externalId: "79745379-e997-43a0-b649-e81c19b86478",
  externalLink: "https://musicbrainz.org/work/79745379-e997-43a0-b649-e81c19b86478",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
