import type { Song } from "../../song.page-type.ts"

export const zaraLarssonWhatHappensHere = {
  id: "019ea4a0-5996-70f5-94ae-f45bceb398d7",
  pageTypeSlug: "song",
  slug: "zara-larsson-what-happens-here",
  title: "What Happens Here",
  artistSlug: "zara-larsson",
  externalId: "8df788f9-3c40-4623-93ff-ef0eca47acd2",
  externalLink: "https://musicbrainz.org/work/8df788f9-3c40-4623-93ff-ef0eca47acd2",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
