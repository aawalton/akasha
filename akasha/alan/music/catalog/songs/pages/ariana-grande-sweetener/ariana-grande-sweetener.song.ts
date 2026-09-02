import type { Song } from "../../song.page-type.ts"

export const arianaGrandeSweetener = {
  id: "019ea4e7-8ad0-7563-b2bb-1ef85030bd1b",
  pageTypeSlug: "song",
  slug: "ariana-grande-sweetener",
  title: "sweetener",
  artistSlug: "ariana-grande",
  externalId: "c84d34d7-7a6f-4a7c-8ef8-2d27e20cf743",
  externalLink: "https://musicbrainz.org/work/c84d34d7-7a6f-4a7c-8ef8-2d27e20cf743",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
