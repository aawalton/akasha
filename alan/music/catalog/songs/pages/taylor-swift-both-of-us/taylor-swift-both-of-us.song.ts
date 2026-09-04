import type { Song } from "../../song.page-type.ts"

export const taylorSwiftBothOfUs = {
  id: "019ea416-10f0-7771-ba66-efeb5c3db614",
  pageTypeSlug: "song",
  slug: "taylor-swift-both-of-us",
  title: "Both of Us",
  artistSlug: "taylor-swift",
  externalId: "a9a4be86-8135-4b65-8193-2e56f08a4e6d",
  externalLink: "https://musicbrainz.org/work/a9a4be86-8135-4b65-8193-2e56f08a4e6d",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
