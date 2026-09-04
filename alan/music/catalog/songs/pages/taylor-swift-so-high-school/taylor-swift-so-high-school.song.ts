import type { Song } from "../../song.page-type.ts"

export const taylorSwiftSoHighSchool = {
  id: "019ea416-2e80-7432-9715-24ceae68e00a",
  pageTypeSlug: "song",
  slug: "taylor-swift-so-high-school",
  title: "So High School",
  artistSlug: "taylor-swift",
  externalId: "0d0c6381-039f-44d4-9cd3-9286bdc9a610",
  externalLink: "https://musicbrainz.org/work/0d0c6381-039f-44d4-9cd3-9286bdc9a610",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
