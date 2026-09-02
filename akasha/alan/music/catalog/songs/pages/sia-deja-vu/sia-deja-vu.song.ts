import type { Song } from "../../song.page-type.ts"

export const siaDejaVu = {
  id: "019ea4c2-d657-7db2-a9d2-92c8a6bb8ad4",
  pageTypeSlug: "song",
  slug: "sia-deja-vu",
  title: "Déjà Vu",
  artistSlug: "sia",
  externalId: "104d2ce5-d9b6-465b-84e9-83b885be71d3",
  externalLink: "https://musicbrainz.org/work/104d2ce5-d9b6-465b-84e9-83b885be71d3",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
