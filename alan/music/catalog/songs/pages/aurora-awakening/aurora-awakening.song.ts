import type { Song } from "../../song.page-type.ts"

export const auroraAwakening = {
  id: "019ea4a5-3944-7f04-b0b9-d8df08267814",
  pageTypeSlug: "song",
  slug: "aurora-awakening",
  title: "Awakening",
  artistSlug: "aurora",
  externalId: "576b6d67-7c33-4de2-85e4-1ef562343cbe",
  externalLink: "https://musicbrainz.org/work/576b6d67-7c33-4de2-85e4-1ef562343cbe",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
