import type { Song } from "../../song.page-type.ts"

export const auroraConqueror = {
  id: "019ea4a5-9d12-72c1-830f-5f3802c3077c",
  pageTypeSlug: "song",
  slug: "aurora-conqueror",
  title: "Conqueror",
  artistSlug: "aurora",
  externalId: "67069a6f-2b9f-48dd-b633-9789792b2072",
  externalLink: "https://musicbrainz.org/work/67069a6f-2b9f-48dd-b633-9789792b2072",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
