import type { Song } from "../../song.page-type.ts"

export const taylorSwiftIHateItHere = {
  id: "019ea416-2b57-7b22-8a9b-4e5f4b9dccfc",
  pageTypeSlug: "song",
  slug: "taylor-swift-i-hate-it-here",
  title: "I Hate It Here",
  artistSlug: "taylor-swift",
  externalId: "ec98e655-0495-458d-8081-7fc2162a51cc",
  externalLink: "https://musicbrainz.org/work/ec98e655-0495-458d-8081-7fc2162a51cc",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
