import type { Song } from "../../song.page-type.ts"

export const taylorSwiftIThinkHeKnows = {
  id: "019ea416-29f6-78de-bc79-ad8c9baa9289",
  pageTypeSlug: "song",
  slug: "taylor-swift-i-think-he-knows",
  title: "I Think He Knows",
  artistSlug: "taylor-swift",
  externalId: "d311e17c-316e-4cff-a790-ce4b894aa47f",
  externalLink: "https://musicbrainz.org/work/d311e17c-316e-4cff-a790-ce4b894aa47f",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
