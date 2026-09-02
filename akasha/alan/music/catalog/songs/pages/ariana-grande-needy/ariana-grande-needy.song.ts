import type { Song } from "../../song.page-type.ts"

export const arianaGrandeNeedy = {
  id: "019ea4e7-c36b-78e6-9550-07f8e1195927",
  pageTypeSlug: "song",
  slug: "ariana-grande-needy",
  title: "needy",
  artistSlug: "ariana-grande",
  externalId: "db238bb2-23e9-42e4-9d00-21f654742602",
  externalLink: "https://musicbrainz.org/work/db238bb2-23e9-42e4-9d00-21f654742602",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
