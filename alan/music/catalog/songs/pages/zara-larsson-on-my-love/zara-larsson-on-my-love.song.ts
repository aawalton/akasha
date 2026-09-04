import type { Song } from "../../song.page-type.ts"

export const zaraLarssonOnMyLove = {
  id: "019ea4a2-5c0a-7d06-9e50-a1ddcc9d2935",
  pageTypeSlug: "song",
  slug: "zara-larsson-on-my-love",
  title: "On My Love",
  artistSlug: "zara-larsson",
  externalId: "fce41d89-b52d-455c-91e0-97343ebb6275",
  externalLink: "https://musicbrainz.org/work/fce41d89-b52d-455c-91e0-97343ebb6275",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
