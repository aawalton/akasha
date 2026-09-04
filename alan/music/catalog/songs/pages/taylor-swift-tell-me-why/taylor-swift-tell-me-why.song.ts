import type { Song } from "../../song.page-type.ts"

export const taylorSwiftTellMeWhy = {
  id: "019ea416-3018-782b-b3cb-20573907c3d4",
  pageTypeSlug: "song",
  slug: "taylor-swift-tell-me-why",
  title: "Tell Me Why",
  artistSlug: "taylor-swift",
  externalId: "2dae6981-ef7b-348a-97f1-35428f51aa72",
  externalLink: "https://musicbrainz.org/work/2dae6981-ef7b-348a-97f1-35428f51aa72",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
