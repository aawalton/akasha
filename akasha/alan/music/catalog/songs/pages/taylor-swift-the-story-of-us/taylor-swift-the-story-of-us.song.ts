import type { Song } from "../../song.page-type.ts"

export const taylorSwiftTheStoryOfUs = {
  id: "019ea416-3b79-7df2-bd3c-04bcb35c5512",
  pageTypeSlug: "song",
  slug: "taylor-swift-the-story-of-us",
  title: "The Story of Us",
  artistSlug: "taylor-swift",
  externalId: "b8bcf019-1b75-3c08-9207-41ffadc7c52d",
  externalLink: "https://musicbrainz.org/work/b8bcf019-1b75-3c08-9207-41ffadc7c52d",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
