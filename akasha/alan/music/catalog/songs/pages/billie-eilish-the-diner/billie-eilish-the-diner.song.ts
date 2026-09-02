import type { Song } from "../../song.page-type.ts"

export const billieEilishTheDiner = {
  id: "019ea4aa-4ea8-73da-ab4d-6352663dd80d",
  pageTypeSlug: "song",
  slug: "billie-eilish-the-diner",
  title: "THE DINER",
  artistSlug: "billie-eilish",
  externalId: "80b2b437-eaa4-4232-aaed-7e9f1f675684",
  externalLink: "https://musicbrainz.org/work/80b2b437-eaa4-4232-aaed-7e9f1f675684",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
