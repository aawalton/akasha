import type { Song } from "../../song.page-type.ts"

export const taylorSwiftAugust = {
  id: "019ea416-0a85-73b7-a7df-61b374966e67",
  pageTypeSlug: "song",
  slug: "taylor-swift-august",
  title: "august",
  artistSlug: "taylor-swift",
  externalId: "6ce75487-483b-48a7-a988-9b16f0912e51",
  externalLink: "https://musicbrainz.org/work/6ce75487-483b-48a7-a988-9b16f0912e51",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
