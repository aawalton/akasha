import type { Song } from "../../song.page-type.ts"

export const auroraInBottles = {
  id: "019ea4a5-5510-738e-97b7-efd45d7ab827",
  pageTypeSlug: "song",
  slug: "aurora-in-bottles",
  title: "In Bottles",
  artistSlug: "aurora",
  externalId: "62e9ac10-139c-43be-aecf-cdf11721ce58",
  externalLink: "https://musicbrainz.org/work/62e9ac10-139c-43be-aecf-cdf11721ce58",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
