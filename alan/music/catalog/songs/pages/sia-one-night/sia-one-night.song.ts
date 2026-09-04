import type { Song } from "../../song.page-type.ts"

export const siaOneNight = {
  id: "019ea4c8-46e0-7042-babb-bfa1e00edc43",
  pageTypeSlug: "song",
  slug: "sia-one-night",
  title: "One Night",
  artistSlug: "sia",
  externalId: "6de07a09-f3ba-4331-b11b-ece14c502634",
  externalLink: "https://musicbrainz.org/work/6de07a09-f3ba-4331-b11b-ece14c502634",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
