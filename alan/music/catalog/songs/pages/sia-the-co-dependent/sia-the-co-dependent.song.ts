import type { Song } from "../../song.page-type.ts"

export const siaTheCoDependent = {
  id: "019ea4cc-f24b-7d7b-a1cb-11d2ca570fe8",
  pageTypeSlug: "song",
  slug: "sia-the-co-dependent",
  title: "The Co-Dependent",
  artistSlug: "sia",
  externalId: "816d761b-413b-4211-ab02-03f8d579781c",
  externalLink: "https://musicbrainz.org/work/816d761b-413b-4211-ab02-03f8d579781c",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
