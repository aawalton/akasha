import type { Song } from "../../song.page-type.ts"

export const kellyClarksonYeah = {
  id: "019ea4b1-8f29-7131-a01e-825d4ac8d26f",
  pageTypeSlug: "song",
  slug: "kelly-clarkson-yeah",
  title: "Yeah",
  artistSlug: "kelly-clarkson",
  externalId: "1961ce1a-287d-4fef-9e44-d032e1111c73",
  externalLink: "https://musicbrainz.org/work/1961ce1a-287d-4fef-9e44-d032e1111c73",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
} as const satisfies Song
