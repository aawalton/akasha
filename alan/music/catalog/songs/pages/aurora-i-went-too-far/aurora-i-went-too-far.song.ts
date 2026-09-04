import type { Song } from "../../song.page-type.ts"

export const auroraIWentTooFar = {
  id: "019ea4a3-711d-78aa-a126-52d9d5524950",
  pageTypeSlug: "song",
  slug: "aurora-i-went-too-far",
  title: "I Went Too Far",
  artistSlug: "aurora",
  externalId: "1540738c-a75f-4e63-8b38-b0757366514b",
  externalLink: "https://musicbrainz.org/work/1540738c-a75f-4e63-8b38-b0757366514b",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
