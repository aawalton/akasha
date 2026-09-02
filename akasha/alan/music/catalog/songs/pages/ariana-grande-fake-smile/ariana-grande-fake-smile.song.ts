import type { Song } from "../../song.page-type.ts"

export const arianaGrandeFakeSmile = {
  id: "019ea4e3-48ec-752e-ad89-67e75baf2523",
  pageTypeSlug: "song",
  slug: "ariana-grande-fake-smile",
  title: "fake smile",
  artistSlug: "ariana-grande",
  externalId: "d3467912-987d-49a6-b76d-a9e395fe923b",
  externalLink: "https://musicbrainz.org/work/d3467912-987d-49a6-b76d-a9e395fe923b",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
