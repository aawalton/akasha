import type { Song } from "../../song.page-type.ts"

export const taylorSwiftEndGame = {
  id: "019ea416-1781-75b9-8354-124de46224fe",
  pageTypeSlug: "song",
  slug: "taylor-swift-end-game",
  title: "End Game",
  artistSlug: "taylor-swift",
  externalId: "e449c947-9f26-4580-b8da-4ca64d7bfd3e",
  externalLink: "https://musicbrainz.org/work/e449c947-9f26-4580-b8da-4ca64d7bfd3e",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
