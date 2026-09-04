import type { Song } from "../../song.page-type.ts"

export const siaBrokenBiscuit = {
  id: "019ea4c5-2504-7612-add1-508c88702514",
  pageTypeSlug: "song",
  slug: "sia-broken-biscuit",
  title: "Broken Biscuit",
  artistSlug: "sia",
  externalId: "a2d5df7c-eb6a-4df3-ab52-6ad3c47adf64",
  externalLink: "https://musicbrainz.org/work/a2d5df7c-eb6a-4df3-ab52-6ad3c47adf64",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
