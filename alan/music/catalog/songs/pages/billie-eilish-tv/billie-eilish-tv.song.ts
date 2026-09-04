import type { Song } from "../../song.page-type.ts"

export const billieEilishTv = {
  id: "019ea4ab-4f66-7552-999f-3b4ce76f1f64",
  pageTypeSlug: "song",
  slug: "billie-eilish-tv",
  title: "TV",
  artistSlug: "billie-eilish",
  externalId: "d4c211a7-df35-4815-b93c-72f6861b30c6",
  externalLink: "https://musicbrainz.org/work/d4c211a7-df35-4815-b93c-72f6861b30c6",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
