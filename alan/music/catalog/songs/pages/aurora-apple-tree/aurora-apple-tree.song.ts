import type { Song } from "../../song.page-type.ts"

export const auroraAppleTree = {
  id: "019ea4a4-2ed1-77de-852d-f624f9366449",
  pageTypeSlug: "song",
  slug: "aurora-apple-tree",
  title: "Apple Tree",
  artistSlug: "aurora",
  externalId: "3658ba97-b1c5-4f5e-87e5-85ce17e62d5f",
  externalLink: "https://musicbrainz.org/work/3658ba97-b1c5-4f5e-87e5-85ce17e62d5f",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
