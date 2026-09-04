import type { Song } from "../../song.page-type.ts"

export const billieEilishBlue = {
  id: "019ea4aa-e37f-7756-9938-277f33f05569",
  pageTypeSlug: "song",
  slug: "billie-eilish-blue",
  title: "BLUE",
  artistSlug: "billie-eilish",
  externalId: "a97737f7-a1c2-4c2e-92ad-d5cf48ffd1ce",
  externalLink: "https://musicbrainz.org/work/a97737f7-a1c2-4c2e-92ad-d5cf48ffd1ce",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
