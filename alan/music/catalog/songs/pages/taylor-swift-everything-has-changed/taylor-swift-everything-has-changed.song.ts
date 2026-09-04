import type { Song } from "../../song.page-type.ts"

export const taylorSwiftEverythingHasChanged = {
  id: "019ea416-0dc5-7e34-9ff8-607b5b2d9a23",
  pageTypeSlug: "song",
  slug: "taylor-swift-everything-has-changed",
  title: "Everything Has Changed",
  artistSlug: "taylor-swift",
  externalId: "8c58a94d-989a-4264-9941-6a792bf871b4",
  externalLink: "https://musicbrainz.org/work/8c58a94d-989a-4264-9941-6a792bf871b4",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
