import type { Song } from "../../song.page-type.ts"

export const kellyClarksonHaunted = {
  id: "019ea4b0-7553-7813-b2be-03619c614283",
  pageTypeSlug: "song",
  slug: "kelly-clarkson-haunted",
  title: "Haunted",
  artistSlug: "kelly-clarkson",
  externalId: "d5902350-3fa1-4a74-a862-80fb3477324d",
  externalLink: "https://musicbrainz.org/work/d5902350-3fa1-4a74-a862-80fb3477324d",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
