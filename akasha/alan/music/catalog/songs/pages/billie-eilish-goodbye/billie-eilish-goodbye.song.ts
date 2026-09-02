import type { Song } from "../../song.page-type.ts"

export const billieEilishGoodbye = {
  id: "019ea4a9-e814-7d50-b7b9-1c0aa026891a",
  pageTypeSlug: "song",
  slug: "billie-eilish-goodbye",
  title: "goodbye",
  artistSlug: "billie-eilish",
  externalId: "6a17fb4b-2190-4d64-b369-fed846ab42d2",
  externalLink: "https://musicbrainz.org/work/6a17fb4b-2190-4d64-b369-fed846ab42d2",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
