import type { Song } from "../../song.page-type.ts"

export const arianaGrandeObvious = {
  id: "019ea4e4-9673-79eb-9dd5-23eab4122a3a",
  pageTypeSlug: "song",
  slug: "ariana-grande-obvious",
  title: "obvious",
  artistSlug: "ariana-grande",
  externalId: "388c06d5-43b7-42ab-98f2-214acd844616",
  externalLink: "https://musicbrainz.org/work/388c06d5-43b7-42ab-98f2-214acd844616",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
