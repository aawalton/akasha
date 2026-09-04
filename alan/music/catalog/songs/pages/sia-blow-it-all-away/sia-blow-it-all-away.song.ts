import type { Song } from "../../song.page-type.ts"

export const siaBlowItAllAway = {
  id: "019ea4c2-ccc9-7f58-98d5-07365e219ee1",
  pageTypeSlug: "song",
  slug: "sia-blow-it-all-away",
  title: "Blow It All Away",
  artistSlug: "sia",
  externalId: "0ed081f0-e051-40ac-8bde-03fac2a86d07",
  externalLink: "https://musicbrainz.org/work/0ed081f0-e051-40ac-8bde-03fac2a86d07",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
