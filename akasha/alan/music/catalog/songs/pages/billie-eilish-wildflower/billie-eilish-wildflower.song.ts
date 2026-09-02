import type { Song } from "../../song.page-type.ts"

export const billieEilishWildflower = {
  id: "019ea4aa-03d6-77dc-b5f6-a976c23c4bd5",
  pageTypeSlug: "song",
  slug: "billie-eilish-wildflower",
  title: "WILDFLOWER",
  artistSlug: "billie-eilish",
  externalId: "6ce3e6f5-8a41-4dd3-967a-8be19ff7a25e",
  externalLink: "https://musicbrainz.org/work/6ce3e6f5-8a41-4dd3-967a-8be19ff7a25e",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
