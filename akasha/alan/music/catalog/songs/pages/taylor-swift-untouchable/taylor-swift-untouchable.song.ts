import type { Song } from "../../song.page-type.ts"

export const taylorSwiftUntouchable = {
  id: "019ea416-4539-7453-aa28-8262598be289",
  pageTypeSlug: "song",
  slug: "taylor-swift-untouchable",
  title: "Untouchable",
  artistSlug: "taylor-swift",
  externalId: "4c3d3a79-7930-4586-a85f-cabe706e8c67",
  externalLink: "https://musicbrainz.org/work/4c3d3a79-7930-4586-a85f-cabe706e8c67",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
