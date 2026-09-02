import type { Song } from "../../song.page-type.ts"

export const taylorSwiftActuallyRomantic = {
  id: "019ea416-0abe-77e3-99b3-367dc4845257",
  pageTypeSlug: "song",
  slug: "taylor-swift-actually-romantic",
  title: "Actually Romantic",
  artistSlug: "taylor-swift",
  externalId: "6d1c1dec-975b-4631-89a1-cbd9c0a564b5",
  externalLink: "https://musicbrainz.org/work/6d1c1dec-975b-4631-89a1-cbd9c0a564b5",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
