import type { Song } from "../../song.page-type.ts"

export const siaIncredible = {
  id: "019ea4c9-b795-7575-b06b-06d2e6dd1bf1",
  pageTypeSlug: "song",
  slug: "sia-incredible",
  title: "Incredible",
  artistSlug: "sia",
  externalId: "bcb1a0fc-8baa-4c22-b91f-5639627bb72e",
  externalLink: "https://musicbrainz.org/work/bcb1a0fc-8baa-4c22-b91f-5639627bb72e",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
