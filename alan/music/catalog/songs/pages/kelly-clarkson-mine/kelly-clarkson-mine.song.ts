import type { Song } from "../../song.page-type.ts"

export const kellyClarksonMine = {
  id: "019ea4af-b964-76ce-96f8-e914153cc8ad",
  pageTypeSlug: "song",
  slug: "kelly-clarkson-mine",
  title: "mine",
  artistSlug: "kelly-clarkson",
  externalId: "b153942d-c3f3-4658-a172-9479d033a599",
  externalLink: "https://musicbrainz.org/work/b153942d-c3f3-4658-a172-9479d033a599",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
