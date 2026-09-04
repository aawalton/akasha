import type { Song } from "../../song.page-type.ts"

export const emBeiholdSoup = {
  id: "019ea4df-c90b-799e-afa4-989200b96705",
  pageTypeSlug: "song",
  slug: "em-beihold-soup",
  title: "Soup!",
  artistSlug: "em-beihold",
  externalId: "da5f64da-b3a1-48fd-95dc-c0f41f5e187a",
  externalLink: "https://musicbrainz.org/work/da5f64da-b3a1-48fd-95dc-c0f41f5e187a",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
