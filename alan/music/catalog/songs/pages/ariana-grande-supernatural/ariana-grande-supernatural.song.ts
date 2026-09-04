import type { Song } from "../../song.page-type.ts"

export const arianaGrandeSupernatural = {
  id: "019ea4e4-8210-76c9-a30b-7d1552535a41",
  pageTypeSlug: "song",
  slug: "ariana-grande-supernatural",
  title: "supernatural",
  artistSlug: "ariana-grande",
  externalId: "2ff91c20-2753-4df2-9aae-07bc5cc33ab8",
  externalLink: "https://musicbrainz.org/work/2ff91c20-2753-4df2-9aae-07bc5cc33ab8",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
