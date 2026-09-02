import type { Song } from "../../song.page-type.ts"

export const taylorSwiftTheBolter = {
  id: "019ea416-3c7f-72e2-bfd7-4ea480d2c556",
  pageTypeSlug: "song",
  slug: "taylor-swift-the-bolter",
  title: "The Bolter",
  artistSlug: "taylor-swift",
  externalId: "c5269eba-eb09-4f50-be25-696a65084de5",
  externalLink: "https://musicbrainz.org/work/c5269eba-eb09-4f50-be25-696a65084de5",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
