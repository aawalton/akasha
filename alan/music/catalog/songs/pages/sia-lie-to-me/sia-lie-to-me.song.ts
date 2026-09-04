import type { Song } from "../../song.page-type.ts"

export const siaLieToMe = {
  id: "019ea4c8-5e09-748d-a726-25b555dd1295",
  pageTypeSlug: "song",
  slug: "sia-lie-to-me",
  title: "Lie to Me",
  artistSlug: "sia",
  externalId: "7010ab99-bcb0-48a6-b5c1-54c875a45ae3",
  externalLink: "https://musicbrainz.org/work/7010ab99-bcb0-48a6-b5c1-54c875a45ae3",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
