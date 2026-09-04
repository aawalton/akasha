import type { Song } from "../../song.page-type.ts"

export const kellyClarksonGone = {
  id: "019ea4af-d979-7b3e-a1e1-55915d165d7d",
  pageTypeSlug: "song",
  slug: "kelly-clarkson-gone",
  title: "Gone",
  artistSlug: "kelly-clarkson",
  externalId: "bd482b75-57c4-39d3-908c-fb1a0d4224a9",
  externalLink: "https://musicbrainz.org/work/bd482b75-57c4-39d3-908c-fb1a0d4224a9",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
