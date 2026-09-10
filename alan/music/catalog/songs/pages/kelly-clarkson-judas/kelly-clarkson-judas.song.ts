import type { Song } from "../../song.page-type.types.ts"

export const kellyClarksonJudas = {
  id: "019ea4b0-453b-7cc3-9120-fe70b4068ce2",
  pageTypeSlug: "song",
  type: "song",
  slug: "kelly-clarkson-judas",
  title: "Judas",
  artist: "kelly-clarkson",
  externalId: "d0937939-4903-4ae2-bf02-22bf8ef607cd",
  externalLink: "https://musicbrainz.org/work/d0937939-4903-4ae2-bf02-22bf8ef607cd",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
