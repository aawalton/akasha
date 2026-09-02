import type { Song } from "../../song.page-type.ts"

export const arianaGrandeOrdinaryThings = {
  id: "019ea4e5-149e-748e-86eb-696414f15f5b",
  pageTypeSlug: "song",
  slug: "ariana-grande-ordinary-things",
  title: "ordinary things",
  artistSlug: "ariana-grande",
  externalId: "4d916c35-06ef-437d-962b-12ca051bb9f8",
  externalLink: "https://musicbrainz.org/work/4d916c35-06ef-437d-962b-12ca051bb9f8",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
