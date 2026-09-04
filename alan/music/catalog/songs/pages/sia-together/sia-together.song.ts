import type { Song } from "../../song.page-type.ts"

export const siaTogether = {
  id: "019ea4ca-df45-7952-bafa-a2573e232c96",
  pageTypeSlug: "song",
  slug: "sia-together",
  title: "Together",
  artistSlug: "sia",
  externalId: "1969db6f-1959-43da-a3a3-b5cdda5164d0",
  externalLink: "https://musicbrainz.org/work/1969db6f-1959-43da-a3a3-b5cdda5164d0",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
