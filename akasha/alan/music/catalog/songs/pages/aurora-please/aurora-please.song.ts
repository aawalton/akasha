import type { Song } from "../../song.page-type.ts"

export const auroraPlease = {
  id: "019ea4a6-b4e0-7b06-ba65-11dd62985b77",
  pageTypeSlug: "song",
  slug: "aurora-please",
  title: "PLEASE",
  artistSlug: "aurora",
  externalId: "afe9b68f-8c1c-4e31-bea7-9c691734b9a6",
  externalLink: "https://musicbrainz.org/work/afe9b68f-8c1c-4e31-bea7-9c691734b9a6",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: false,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
