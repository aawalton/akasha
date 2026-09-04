import type { Song } from "../../song.page-type.ts"

export const billieEilishLunch = {
  id: "019ea4aa-33ea-7287-ae60-9320c8da624f",
  pageTypeSlug: "song",
  slug: "billie-eilish-lunch",
  title: "LUNCH",
  artistSlug: "billie-eilish",
  externalId: "7e79557a-2452-44d9-8e71-585228633fb8",
  externalLink: "https://musicbrainz.org/work/7e79557a-2452-44d9-8e71-585228633fb8",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
