import type { Song } from "../../song.page-type.ts"

export const auroraSomewhereElse = {
  id: "019ea4a4-6911-742a-9f4a-1a3bdee32748",
  pageTypeSlug: "song",
  slug: "aurora-somewhere-else",
  title: "SOMEWHERE ELSE",
  artistSlug: "aurora",
  externalId: "4368ec16-3f0c-4fb3-b550-83387b5084af",
  externalLink: "https://musicbrainz.org/work/4368ec16-3f0c-4fb3-b550-83387b5084af",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: false,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
