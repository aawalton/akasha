import type { Song } from "../../song.page-type.ts"

export const siaLittleMan = {
  id: "019ea4c8-0daf-731a-92c9-1e3f5a37352c",
  pageTypeSlug: "song",
  slug: "sia-little-man",
  title: "Little Man",
  artistSlug: "sia",
  externalId: "6069c651-99e0-411b-85f1-368e51567daa",
  externalLink: "https://musicbrainz.org/work/6069c651-99e0-411b-85f1-368e51567daa",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
