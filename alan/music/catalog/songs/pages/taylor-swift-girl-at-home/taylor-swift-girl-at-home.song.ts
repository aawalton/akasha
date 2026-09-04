import type { Song } from "../../song.page-type.ts"

export const taylorSwiftGirlAtHome = {
  id: "019ea416-201f-7959-aba4-b3aeec01e56e",
  pageTypeSlug: "song",
  slug: "taylor-swift-girl-at-home",
  title: "Girl at Home",
  artistSlug: "taylor-swift",
  externalId: "65175925-04ed-4d9b-a690-cd606195a7c1",
  externalLink: "https://musicbrainz.org/work/65175925-04ed-4d9b-a690-cd606195a7c1",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
