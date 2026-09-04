import type { Song } from "../../song.page-type.ts"

export const auroraWarrior = {
  id: "019ea4a2-ef86-78f5-b278-47e75a55ae02",
  pageTypeSlug: "song",
  slug: "aurora-warrior",
  title: "Warrior",
  artistSlug: "aurora",
  externalId: "0280cc1e-f51a-4a6a-8a07-c8d2c2aa7a2f",
  externalLink: "https://musicbrainz.org/work/0280cc1e-f51a-4a6a-8a07-c8d2c2aa7a2f",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
