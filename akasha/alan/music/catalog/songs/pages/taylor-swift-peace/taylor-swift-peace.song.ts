import type { Song } from "../../song.page-type.ts"

export const taylorSwiftPeace = {
  id: "019ea416-2deb-7af7-9a75-d8c8f09b6445",
  pageTypeSlug: "song",
  slug: "taylor-swift-peace",
  title: "peace",
  artistSlug: "taylor-swift",
  externalId: "01a657bc-9eab-4839-9862-bb5f9ca71556",
  externalLink: "https://musicbrainz.org/work/01a657bc-9eab-4839-9862-bb5f9ca71556",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  rank: "S",
  singability: "A-",
  tags: ["relationships"],
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
