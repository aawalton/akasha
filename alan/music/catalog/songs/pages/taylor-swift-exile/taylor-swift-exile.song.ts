import type { Song } from "../../song.page-type.types.ts"

export const taylorSwiftExile = {
  id: "019ea416-0e5f-7db8-9ea0-a2ff3b94df04",
  pageTypeSlug: "song",
  type: "song",
  slug: "taylor-swift-exile",
  title: "exile",
  artist: "taylor-swift",
  externalId: "965c0731-790f-4a8b-b8cf-0ef0f7f7d0c1",
  externalLink: "https://musicbrainz.org/work/965c0731-790f-4a8b-b8cf-0ef0f7f7d0c1",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
