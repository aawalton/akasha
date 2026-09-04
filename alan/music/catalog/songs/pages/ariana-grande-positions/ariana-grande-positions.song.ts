import type { Song } from "../../song.page-type.ts"

export const arianaGrandePositions = {
  id: "019ea4e6-de1b-75f6-9756-8edccddb01fc",
  pageTypeSlug: "song",
  slug: "ariana-grande-positions",
  title: "positions",
  artistSlug: "ariana-grande",
  externalId: "a225b3d5-bb35-4de3-bf0c-ef3f54dc0084",
  externalLink: "https://musicbrainz.org/work/a225b3d5-bb35-4de3-bf0c-ef3f54dc0084",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
