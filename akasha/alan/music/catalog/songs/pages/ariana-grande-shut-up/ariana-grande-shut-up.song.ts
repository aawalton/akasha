import type { Song } from "../../song.page-type.ts"

export const arianaGrandeShutUp = {
  id: "019ea4e5-a81f-73f0-8df2-3e991ebde649",
  pageTypeSlug: "song",
  slug: "ariana-grande-shut-up",
  title: "shut up",
  artistSlug: "ariana-grande",
  externalId: "660bb459-44f6-4757-aff2-c1d5bcb24098",
  externalLink: "https://musicbrainz.org/work/660bb459-44f6-4757-aff2-c1d5bcb24098",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
