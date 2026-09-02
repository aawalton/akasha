import type { Song } from "../../song.page-type.ts"

export const kellyClarksonHearMe = {
  id: "019ea4ae-4fc6-7c81-8aea-faae54e6a462",
  pageTypeSlug: "song",
  slug: "kelly-clarkson-hear-me",
  title: "Hear Me",
  artistSlug: "kelly-clarkson",
  externalId: "55350852-9c6d-36f9-8531-bcab65ff2a0c",
  externalLink: "https://musicbrainz.org/work/55350852-9c6d-36f9-8531-bcab65ff2a0c",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
