import type { Song } from "../../song.page-type.ts"

export const zaraLarssonSecret = {
  id: "019ea4a0-2966-7514-80bb-c2399a51c156",
  pageTypeSlug: "song",
  slug: "zara-larsson-secret",
  title: "Secret",
  artistSlug: "zara-larsson",
  externalId: "7c4ce678-88e6-4813-bcb3-1ec5bb4c99f6",
  externalLink: "https://musicbrainz.org/work/7c4ce678-88e6-4813-bcb3-1ec5bb4c99f6",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
