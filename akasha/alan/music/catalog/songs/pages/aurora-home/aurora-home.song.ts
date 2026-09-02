import type { Song } from "../../song.page-type.ts"

export const auroraHome = {
  id: "019ea4a7-3b6c-7b9b-8ad0-35c1f2670f8a",
  pageTypeSlug: "song",
  slug: "aurora-home",
  title: "Home",
  artistSlug: "aurora",
  externalId: "d47bfc98-821f-4fda-b4d7-322f4dc359c6",
  externalLink: "https://musicbrainz.org/work/d47bfc98-821f-4fda-b4d7-322f4dc359c6",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
