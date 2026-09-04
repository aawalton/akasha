import type { Song } from "../../song.page-type.ts"

export const kellyClarksonReady = {
  id: "019ea4c1-85fc-7dc0-8f65-9d8b00fcebe3",
  pageTypeSlug: "song",
  slug: "kelly-clarkson-ready",
  title: "Ready",
  artistSlug: "kelly-clarkson",
  externalId: "e457c8d8-f485-39c6-bc15-120624342320",
  externalLink: "https://musicbrainz.org/work/e457c8d8-f485-39c6-bc15-120624342320",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
