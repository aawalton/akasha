import type { Song } from "../../song.page-type.ts"

export const taylorSwiftFoolishOne = {
  id: "019ea416-1f4b-739a-a138-4c378b246264",
  pageTypeSlug: "song",
  slug: "taylor-swift-foolish-one",
  title: "Foolish One",
  artistSlug: "taylor-swift",
  externalId: "5c8c4f39-ace8-4079-b9d4-555df1e2e546",
  externalLink: "https://musicbrainz.org/work/5c8c4f39-ace8-4079-b9d4-555df1e2e546",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
