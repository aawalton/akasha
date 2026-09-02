import type { Song } from "../../song.page-type.ts"

export const siaAudio = {
  id: "019ea4c6-430a-785b-8463-7131ad1b47bf",
  pageTypeSlug: "song",
  slug: "sia-audio",
  title: "Audio",
  artistSlug: "sia",
  externalId: "e45305da-9439-4eec-9445-398dceb84848",
  externalLink: "https://musicbrainz.org/work/e45305da-9439-4eec-9445-398dceb84848",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
