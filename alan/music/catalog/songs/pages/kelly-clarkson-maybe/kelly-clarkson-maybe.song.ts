import type { Song } from "../../song.page-type.ts"

export const kellyClarksonMaybe = {
  id: "019ea4af-dfe3-7731-bdfa-6bf697af28e3",
  pageTypeSlug: "song",
  slug: "kelly-clarkson-maybe",
  title: "Maybe",
  artistSlug: "kelly-clarkson",
  externalId: "c294e115-d214-479f-80f7-a6610fa4a10d",
  externalLink: "https://musicbrainz.org/work/c294e115-d214-479f-80f7-a6610fa4a10d",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
