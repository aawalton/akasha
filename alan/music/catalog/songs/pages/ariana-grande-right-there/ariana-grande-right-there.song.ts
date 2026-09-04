import type { Song } from "../../song.page-type.ts"

export const arianaGrandeRightThere = {
  id: "019ea4e6-97bf-7a31-b691-67e98da7cde2",
  pageTypeSlug: "song",
  slug: "ariana-grande-right-there",
  title: "Right There",
  artistSlug: "ariana-grande",
  externalId: "9b41bb33-53a1-42f2-8bb2-b4692b4d1a21",
  externalLink: "https://musicbrainz.org/work/9b41bb33-53a1-42f2-8bb2-b4692b4d1a21",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
