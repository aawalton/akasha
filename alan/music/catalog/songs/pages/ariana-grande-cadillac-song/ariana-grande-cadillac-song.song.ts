import type { Song } from "../../song.page-type.ts"

export const arianaGrandeCadillacSong = {
  id: "019ea4e3-5a77-7039-8590-f483887fa816",
  pageTypeSlug: "song",
  slug: "ariana-grande-cadillac-song",
  title: "Cadillac Song",
  artistSlug: "ariana-grande",
  externalId: "d8159d2c-3207-49c1-8d95-81fc593e09cf",
  externalLink: "https://musicbrainz.org/work/d8159d2c-3207-49c1-8d95-81fc593e09cf",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
