import type { Song } from "../../song.page-type.ts"

export const taylorSwiftGorgeous = {
  id: "019ea416-192b-7a76-a270-feca1b48c617",
  pageTypeSlug: "song",
  slug: "taylor-swift-gorgeous",
  title: "Gorgeous",
  artistSlug: "taylor-swift",
  externalId: "0ae906ea-8d92-44ae-99b1-2e2ae1483cd2",
  externalLink: "https://musicbrainz.org/work/0ae906ea-8d92-44ae-99b1-2e2ae1483cd2",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
