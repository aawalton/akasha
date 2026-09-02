import type { Song } from "../../song.page-type.ts"

export const siaGoOn = {
  id: "019ea4c7-b1da-7fef-8a76-55a441851996",
  pageTypeSlug: "song",
  slug: "sia-go-on",
  title: "Go On",
  artistSlug: "sia",
  externalId: "4cbae07e-a0e9-4378-9c1e-ede2e63f7aad",
  externalLink: "https://musicbrainz.org/work/4cbae07e-a0e9-4378-9c1e-ede2e63f7aad",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
