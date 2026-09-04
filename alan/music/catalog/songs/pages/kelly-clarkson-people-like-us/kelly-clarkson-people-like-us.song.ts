import type { Song } from "../../song.page-type.ts"

export const kellyClarksonPeopleLikeUs = {
  id: "019ea4c1-287d-736e-9c3b-edd89f646a0f",
  pageTypeSlug: "song",
  slug: "kelly-clarkson-people-like-us",
  title: "People Like Us",
  artistSlug: "kelly-clarkson",
  externalId: "a700ae69-f1df-4241-9b47-8090deadd70a",
  externalLink: "https://musicbrainz.org/work/a700ae69-f1df-4241-9b47-8090deadd70a",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
