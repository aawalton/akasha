import type { Song } from "../../song.page-type.ts"

export const arianaGrandeEveryday = {
  id: "019ea4e0-a419-7607-b9b5-36d69ada79f1",
  pageTypeSlug: "song",
  slug: "ariana-grande-everyday",
  title: "Everyday",
  artistSlug: "ariana-grande",
  externalId: "1c057afd-6f3a-4cea-b30d-6f53658708cb",
  externalLink: "https://musicbrainz.org/work/1c057afd-6f3a-4cea-b30d-6f53658708cb",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
