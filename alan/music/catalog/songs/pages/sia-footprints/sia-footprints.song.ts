import type { Song } from "../../song.page-type.ts"

export const siaFootprints = {
  id: "019ea4c7-0192-7183-ab6e-bb273432c307",
  pageTypeSlug: "song",
  slug: "sia-footprints",
  title: "Footprints",
  artistSlug: "sia",
  externalId: "23cf5d48-e097-4c48-91b7-ba7e927df11c",
  externalLink: "https://musicbrainz.org/work/23cf5d48-e097-4c48-91b7-ba7e927df11c",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
