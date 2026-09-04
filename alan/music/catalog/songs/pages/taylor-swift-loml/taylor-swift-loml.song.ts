import type { Song } from "../../song.page-type.ts"

export const taylorSwiftLoml = {
  id: "019ea416-1d7a-744a-ad2f-2ee484405436",
  pageTypeSlug: "song",
  slug: "taylor-swift-loml",
  title: "loml",
  artistSlug: "taylor-swift",
  externalId: "3ebe6704-cd95-40de-b171-73c2e82d8ad7",
  externalLink: "https://musicbrainz.org/work/3ebe6704-cd95-40de-b171-73c2e82d8ad7",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
