import type { Song } from "../../song.page-type.ts"

export const siaLentil = {
  id: "019ea4c8-6e54-76fc-a2db-bfeeec8bf30b",
  pageTypeSlug: "song",
  slug: "sia-lentil",
  title: "Lentil",
  artistSlug: "sia",
  externalId: "743cd5b5-57b4-418e-b886-163ba9dd36b7",
  externalLink: "https://musicbrainz.org/work/743cd5b5-57b4-418e-b886-163ba9dd36b7",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
