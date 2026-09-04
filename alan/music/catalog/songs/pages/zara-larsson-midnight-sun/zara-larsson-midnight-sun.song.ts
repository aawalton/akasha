import type { Song } from "../../song.page-type.ts"

export const zaraLarssonMidnightSun = {
  id: "019ea4a1-4dc0-7310-b59f-6c53e68f7068",
  pageTypeSlug: "song",
  slug: "zara-larsson-midnight-sun",
  title: "Midnight Sun",
  artistSlug: "zara-larsson",
  externalId: "c0928fd0-d8b8-4d60-a769-2ad8c43ce141",
  externalLink: "https://musicbrainz.org/work/c0928fd0-d8b8-4d60-a769-2ad8c43ce141",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
