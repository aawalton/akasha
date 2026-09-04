import type { Song } from "../../song.page-type.ts"

export const arianaGrandeMonopoly = {
  id: "019ea4e7-ddd4-7ac6-add4-3e3aea0296c4",
  pageTypeSlug: "song",
  slug: "ariana-grande-monopoly",
  title: "Monopoly",
  artistSlug: "ariana-grande",
  externalId: "e09bce07-36b2-45fd-aa16-2d7106eb5237",
  externalLink: "https://musicbrainz.org/work/e09bce07-36b2-45fd-aa16-2d7106eb5237",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
