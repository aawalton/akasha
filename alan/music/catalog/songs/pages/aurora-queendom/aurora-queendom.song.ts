import type { Song } from "../../song.page-type.ts"

export const auroraQueendom = {
  id: "019ea4a3-96d7-7519-85d0-de560dc7c201",
  pageTypeSlug: "song",
  slug: "aurora-queendom",
  title: "Queendom",
  artistSlug: "aurora",
  externalId: "1a82dfbf-326a-4912-a5cd-687deb2ebeb0",
  externalLink: "https://musicbrainz.org/work/1a82dfbf-326a-4912-a5cd-687deb2ebeb0",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
