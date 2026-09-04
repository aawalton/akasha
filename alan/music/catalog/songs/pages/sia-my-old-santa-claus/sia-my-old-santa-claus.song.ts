import type { Song } from "../../song.page-type.ts"

export const siaMyOldSantaClaus = {
  id: "019ea4c8-ef19-7197-a53e-4965be51a5a8",
  pageTypeSlug: "song",
  slug: "sia-my-old-santa-claus",
  title: "My Old Santa Claus",
  artistSlug: "sia",
  externalId: "8afebdd0-cb7d-495b-af49-54f0cabd09ac",
  externalLink: "https://musicbrainz.org/work/8afebdd0-cb7d-495b-af49-54f0cabd09ac",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
