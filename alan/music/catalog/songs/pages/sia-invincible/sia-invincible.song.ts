import type { Song } from "../../song.page-type.ts"

export const siaInvincible = {
  id: "019ea4af-99f8-765e-bdb2-1a0be4b3708e",
  pageTypeSlug: "song",
  slug: "sia-invincible",
  title: "Invincible",
  artistSlug: "sia",
  externalId: "a5ca49c1-1b32-43e2-9e32-b304550b2961",
  externalLink: "https://musicbrainz.org/work/a5ca49c1-1b32-43e2-9e32-b304550b2961",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: false,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
