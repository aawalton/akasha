import type { Song } from "../../song.page-type.ts"

export const kellyClarksonYouThoughtWrong = {
  id: "019ea4b2-d0df-7223-8697-5c5cf53ca4d8",
  pageTypeSlug: "song",
  slug: "kelly-clarkson-you-thought-wrong",
  title: "You Thought Wrong",
  artistSlug: "kelly-clarkson",
  externalId: "87c564d3-e0c4-4cb6-afde-358e2d4e0d83",
  externalLink: "https://musicbrainz.org/work/87c564d3-e0c4-4cb6-afde-358e2d4e0d83",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
