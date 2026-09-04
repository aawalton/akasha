import type { Song } from "../../song.page-type.ts"

export const auroraHeathens = {
  id: "019ea4a5-952e-784d-b12d-74148e5ec209",
  pageTypeSlug: "song",
  slug: "aurora-heathens",
  title: "Heathens",
  artistSlug: "aurora",
  externalId: "6577c3ae-3a6f-469f-a278-c81babff2746",
  externalLink: "https://musicbrainz.org/work/6577c3ae-3a6f-469f-a278-c81babff2746",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
