import type { Song } from "../../song.page-type.ts"

export const arianaGrandeTestDrive = {
  id: "019ea4e5-58f0-76c3-85f4-0c71dbec9921",
  pageTypeSlug: "song",
  slug: "ariana-grande-test-drive",
  title: "test drive",
  artistSlug: "ariana-grande",
  externalId: "52e6be2c-3294-49ce-bbc1-6d4bdc8385c0",
  externalLink: "https://musicbrainz.org/work/52e6be2c-3294-49ce-bbc1-6d4bdc8385c0",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
