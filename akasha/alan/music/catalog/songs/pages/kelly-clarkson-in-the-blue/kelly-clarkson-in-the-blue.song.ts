import type { Song } from "../../song.page-type.ts"

export const kellyClarksonInTheBlue = {
  id: "019ea4ae-2c51-783a-9b10-a9249a4f9437",
  pageTypeSlug: "song",
  slug: "kelly-clarkson-in-the-blue",
  title: "In the Blue",
  artistSlug: "kelly-clarkson",
  externalId: "4d4568b9-e6ac-4841-919c-97edb6809fbe",
  externalLink: "https://musicbrainz.org/work/4d4568b9-e6ac-4841-919c-97edb6809fbe",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
