import type { Song } from "../../song.page-type.ts"

export const siaFlames = {
  id: "019ea4c8-a4be-7fec-af55-cdd68c1ef3d7",
  pageTypeSlug: "song",
  slug: "sia-flames",
  title: "Flames",
  artistSlug: "sia",
  externalId: "7aa8f2e4-3354-4ba3-8a2b-be55b94fd399",
  externalLink: "https://musicbrainz.org/work/7aa8f2e4-3354-4ba3-8a2b-be55b94fd399",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
