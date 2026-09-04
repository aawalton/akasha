import type { Song } from "../../song.page-type.ts"

export const taylorSwiftDress = {
  id: "019ea416-0e2c-7061-812b-7f6d8a0d72fc",
  pageTypeSlug: "song",
  slug: "taylor-swift-dress",
  title: "Dress",
  artistSlug: "taylor-swift",
  externalId: "93f308df-6621-4166-9318-0078f9182d47",
  externalLink: "https://musicbrainz.org/work/93f308df-6621-4166-9318-0078f9182d47",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
