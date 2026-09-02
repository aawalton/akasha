import type { Song } from "../../song.page-type.ts"

export const taylorSwiftDorothea = {
  id: "019ea416-05d5-79a0-b5fe-75e5aea9d6e4",
  pageTypeSlug: "song",
  slug: "taylor-swift-dorothea",
  title: "dorothea",
  artistSlug: "taylor-swift",
  externalId: "37b4775d-f529-4a37-addf-208b1c1d2952",
  externalLink: "https://musicbrainz.org/work/37b4775d-f529-4a37-addf-208b1c1d2952",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
