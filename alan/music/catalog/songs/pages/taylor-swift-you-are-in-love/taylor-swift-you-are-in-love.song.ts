import type { Song } from "../../song.page-type.ts"

export const taylorSwiftYouAreInLove = {
  id: "019ea416-49a5-7cca-97c4-a0c26e8d659e",
  pageTypeSlug: "song",
  slug: "taylor-swift-you-are-in-love",
  title: "You Are in Love",
  artistSlug: "taylor-swift",
  externalId: "ae0a685e-025e-4cd5-9aed-117249daa3ff",
  externalLink: "https://musicbrainz.org/work/ae0a685e-025e-4cd5-9aed-117249daa3ff",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
