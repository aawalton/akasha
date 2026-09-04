import type { Song } from "../../song.page-type.ts"

export const siaMountains = {
  id: "019ea4ca-209a-7418-8eb5-1e48f1c23b95",
  pageTypeSlug: "song",
  slug: "sia-mountains",
  title: "Mountains",
  artistSlug: "sia",
  externalId: "e843b885-43f4-43e7-beae-10aa281ec25e",
  externalLink: "https://musicbrainz.org/work/e843b885-43f4-43e7-beae-10aa281ec25e",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: false,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
