import type { Song } from "../../song.page-type.ts"

export const taylorSwiftKarma = {
  id: "019ea416-20bc-768d-9c71-a5b5f52c0478",
  pageTypeSlug: "song",
  slug: "taylor-swift-karma",
  title: "Karma",
  artistSlug: "taylor-swift",
  externalId: "6e2a34d7-b4b5-41e3-a7e8-e307dca8c90b",
  externalLink: "https://musicbrainz.org/work/6e2a34d7-b4b5-41e3-a7e8-e307dca8c90b",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
