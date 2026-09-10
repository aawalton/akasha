import type { Song } from "../../song.page-type.types.ts"

export const taylorSwiftComeBackBeHere = {
  id: "019ea416-17ed-764e-9fa3-83c9e508f290",
  pageTypeSlug: "song",
  type: "song",
  slug: "taylor-swift-come-back-be-here",
  title: "Come Back… Be Here",
  artist: "taylor-swift",
  externalId: "fe4c649c-751f-4261-a009-9dd6944d986e",
  externalLink: "https://musicbrainz.org/work/fe4c649c-751f-4261-a009-9dd6944d986e",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
