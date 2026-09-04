import type { Song } from "../../song.page-type.ts"

export const taylorSwiftCardigan = {
  id: "019ea416-0596-7d5b-a981-e2997ebab574",
  pageTypeSlug: "song",
  slug: "taylor-swift-cardigan",
  title: "cardigan",
  artistSlug: "taylor-swift",
  externalId: "33d85bba-6afc-4324-8690-28ea9b40c526",
  externalLink: "https://musicbrainz.org/work/33d85bba-6afc-4324-8690-28ea9b40c526",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
