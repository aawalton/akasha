import type { Song } from "../../song.page-type.ts"

export const arianaGrandeRainOnMe = {
  id: "019ea4e4-1a7e-7a72-8b53-c965e3e78f0b",
  pageTypeSlug: "song",
  slug: "ariana-grande-rain-on-me",
  title: "Rain on Me",
  artistSlug: "ariana-grande",
  externalId: "0d7a6bf0-9a91-46d4-b1df-10e84601a1dd",
  externalLink: "https://musicbrainz.org/work/0d7a6bf0-9a91-46d4-b1df-10e84601a1dd",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
