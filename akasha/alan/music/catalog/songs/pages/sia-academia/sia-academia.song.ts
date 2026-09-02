import type { Song } from "../../song.page-type.ts"

export const siaAcademia = {
  id: "019ea4c3-c8e1-7476-9c47-59c136286248",
  pageTypeSlug: "song",
  slug: "sia-academia",
  title: "Academia",
  artistSlug: "sia",
  externalId: "513b7082-51f6-49b3-959d-60eaeb8cffdc",
  externalLink: "https://musicbrainz.org/work/513b7082-51f6-49b3-959d-60eaeb8cffdc",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
