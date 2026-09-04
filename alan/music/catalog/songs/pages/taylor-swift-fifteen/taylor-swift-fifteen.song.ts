import type { Song } from "../../song.page-type.ts"

export const taylorSwiftFifteen = {
  id: "019ea416-2086-785a-b2d3-6fbfbda170fb",
  pageTypeSlug: "song",
  slug: "taylor-swift-fifteen",
  title: "Fifteen",
  artistSlug: "taylor-swift",
  externalId: "6cad3efd-e9f4-3dcd-9b71-fc25b630382b",
  externalLink: "https://musicbrainz.org/work/6cad3efd-e9f4-3dcd-9b71-fc25b630382b",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
