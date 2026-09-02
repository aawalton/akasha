import type { Song } from "../../song.page-type.ts"

export const arianaGrandePeteDavidson = {
  id: "019ea4e7-d5a6-7ed7-a37e-89668efea557",
  pageTypeSlug: "song",
  slug: "ariana-grande-pete-davidson",
  title: "pete davidson",
  artistSlug: "ariana-grande",
  externalId: "dbe81153-81fb-4009-a2a7-27e78d8d05ce",
  externalLink: "https://musicbrainz.org/work/dbe81153-81fb-4009-a2a7-27e78d8d05ce",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
