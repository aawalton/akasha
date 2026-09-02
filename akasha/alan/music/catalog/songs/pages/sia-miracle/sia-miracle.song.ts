import type { Song } from "../../song.page-type.ts"

export const siaMiracle = {
  id: "019ea4c7-9e59-7333-b7df-b259e9bf133e",
  pageTypeSlug: "song",
  slug: "sia-miracle",
  title: "Miracle",
  artistSlug: "sia",
  externalId: "460ec193-9059-42ce-9052-4e04cedf029c",
  externalLink: "https://musicbrainz.org/work/460ec193-9059-42ce-9052-4e04cedf029c",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
