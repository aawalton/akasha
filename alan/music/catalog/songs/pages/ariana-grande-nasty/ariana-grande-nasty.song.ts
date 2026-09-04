import type { Song } from "../../song.page-type.ts"

export const arianaGrandeNasty = {
  id: "019ea4e8-a83f-7dc2-b1b8-93e814686b6d",
  pageTypeSlug: "song",
  slug: "ariana-grande-nasty",
  title: "nasty",
  artistSlug: "ariana-grande",
  externalId: "fe5aaf8c-2197-49e8-be92-721383a9b69e",
  externalLink: "https://musicbrainz.org/work/fe5aaf8c-2197-49e8-be92-721383a9b69e",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
