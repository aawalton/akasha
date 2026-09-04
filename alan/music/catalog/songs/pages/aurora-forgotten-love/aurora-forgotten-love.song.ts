import type { Song } from "../../song.page-type.ts"

export const auroraForgottenLove = {
  id: "019ea4a5-3005-7c74-b529-ec513823552d",
  pageTypeSlug: "song",
  slug: "aurora-forgotten-love",
  title: "Forgotten Love",
  artistSlug: "aurora",
  externalId: "576914a2-4a1e-47b6-b71a-3af47efa50b2",
  externalLink: "https://musicbrainz.org/work/576914a2-4a1e-47b6-b71a-3af47efa50b2",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
