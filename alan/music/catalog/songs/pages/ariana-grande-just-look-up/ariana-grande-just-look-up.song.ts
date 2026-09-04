import type { Song } from "../../song.page-type.ts"

export const arianaGrandeJustLookUp = {
  id: "019ea4e1-7e84-75a6-b77f-2bacc6bc113b",
  pageTypeSlug: "song",
  slug: "ariana-grande-just-look-up",
  title: "Just Look Up",
  artistSlug: "ariana-grande",
  externalId: "6281e728-29f5-45b3-a466-c7fa96528d82",
  externalLink: "https://musicbrainz.org/work/6281e728-29f5-45b3-a466-c7fa96528d82",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
