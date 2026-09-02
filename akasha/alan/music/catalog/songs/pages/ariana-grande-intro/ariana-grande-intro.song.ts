import type { Song } from "../../song.page-type.ts"

export const arianaGrandeIntro = {
  id: "019ea4e1-fbe5-7651-92e0-cf0fc5ae9851",
  pageTypeSlug: "song",
  slug: "ariana-grande-intro",
  title: "Intro",
  artistSlug: "ariana-grande",
  externalId: "7703d087-51e0-4071-8402-1870b7d86ec8",
  externalLink: "https://musicbrainz.org/work/7703d087-51e0-4071-8402-1870b7d86ec8",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
