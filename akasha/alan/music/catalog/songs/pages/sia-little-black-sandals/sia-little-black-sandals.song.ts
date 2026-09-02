import type { Song } from "../../song.page-type.ts"

export const siaLittleBlackSandals = {
  id: "019ea4c6-dfef-78ea-9465-896e4449f979",
  pageTypeSlug: "song",
  slug: "sia-little-black-sandals",
  title: "Little Black Sandals",
  artistSlug: "sia",
  externalId: "0edd89ff-11ab-4960-965c-08af576d7673",
  externalLink: "https://musicbrainz.org/work/0edd89ff-11ab-4960-965c-08af576d7673",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
