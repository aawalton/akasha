import type { Song } from "../../song.page-type.ts"

export const siaTheGreatest = {
  id: "019ea4cc-6e18-7271-ba7f-cec0ee4756ab",
  pageTypeSlug: "song",
  slug: "sia-the-greatest",
  title: "The Greatest",
  artistSlug: "sia",
  externalId: "620f7a88-b003-4492-9028-89d742fa5d2e",
  externalLink: "https://musicbrainz.org/work/620f7a88-b003-4492-9028-89d742fa5d2e",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
