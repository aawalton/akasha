import type { Song } from "../../song.page-type.ts"

export const auroraTheInnocent = {
  id: "019ea4a6-61fc-71bd-8293-3c19385a5f77",
  pageTypeSlug: "song",
  slug: "aurora-the-innocent",
  title: "The Innocent",
  artistSlug: "aurora",
  externalId: "9d52c4a4-dcb7-4fb1-be64-87646f608de6",
  externalLink: "https://musicbrainz.org/work/9d52c4a4-dcb7-4fb1-be64-87646f608de6",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
