import type { Song } from "../../song.page-type.ts"

export const taylorSwiftDramaQueen = {
  id: "019ea416-0ec8-73a6-b603-df45762a96ac",
  pageTypeSlug: "song",
  slug: "taylor-swift-drama-queen",
  title: "Drama Queen",
  artistSlug: "taylor-swift",
  externalId: "9749c2f9-52b8-4fa4-ad4e-37d599abb9f1",
  externalLink: "https://musicbrainz.org/work/9749c2f9-52b8-4fa4-ad4e-37d599abb9f1",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
