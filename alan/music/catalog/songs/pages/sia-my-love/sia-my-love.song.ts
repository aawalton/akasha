import type { Song } from "../../song.page-type.ts"

export const siaMyLove = {
  id: "019ea4c6-aa0c-7279-a352-bf266a50d886",
  pageTypeSlug: "song",
  slug: "sia-my-love",
  title: "My Love",
  artistSlug: "sia",
  externalId: "05a9e944-767c-49d7-859c-59f561511ee6",
  externalLink: "https://musicbrainz.org/work/05a9e944-767c-49d7-859c-59f561511ee6",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
