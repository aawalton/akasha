import type { Song } from "../../song.page-type.ts"

export const siaIMInHere = {
  id: "019ea4c9-afdb-761f-b0a8-fd1e940aff00",
  pageTypeSlug: "song",
  slug: "sia-i-m-in-here",
  title: "I’m in Here",
  artistSlug: "sia",
  externalId: "b79acfb1-22ce-4e8a-ab88-6b864cdbecae",
  externalLink: "https://musicbrainz.org/work/b79acfb1-22ce-4e8a-ab88-6b864cdbecae",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
