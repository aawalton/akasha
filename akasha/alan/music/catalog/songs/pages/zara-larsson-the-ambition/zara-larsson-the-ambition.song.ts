import type { Song } from "../../song.page-type.ts"

export const zaraLarssonTheAmbition = {
  id: "019ea4a0-3048-7353-86d8-eee7c23ccdd2",
  pageTypeSlug: "song",
  slug: "zara-larsson-the-ambition",
  title: "The Ambition",
  artistSlug: "zara-larsson",
  externalId: "7db0fcea-f1a1-4fa0-aa1a-17c643f11b42",
  externalLink: "https://musicbrainz.org/work/7db0fcea-f1a1-4fa0-aa1a-17c643f11b42",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
