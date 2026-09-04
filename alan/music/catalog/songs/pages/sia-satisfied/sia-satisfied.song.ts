import type { Song } from "../../song.page-type.ts"

export const siaSatisfied = {
  id: "019ea4cb-c750-761d-8edb-1f33fa3f772d",
  pageTypeSlug: "song",
  slug: "sia-satisfied",
  title: "Satisfied",
  artistSlug: "sia",
  externalId: "3ac3f0d2-8c53-4ee5-87d7-da90fec74458",
  externalLink: "https://musicbrainz.org/work/3ac3f0d2-8c53-4ee5-87d7-da90fec74458",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
