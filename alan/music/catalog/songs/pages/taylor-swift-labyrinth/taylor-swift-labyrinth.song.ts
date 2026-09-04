import type { Song } from "../../song.page-type.ts"

export const taylorSwiftLabyrinth = {
  id: "019ea416-29c3-7070-b9d4-41150ee35b53",
  pageTypeSlug: "song",
  slug: "taylor-swift-labyrinth",
  title: "Labyrinth",
  artistSlug: "taylor-swift",
  externalId: "d264e431-cb95-4751-9931-9eefadf4c1ee",
  externalLink: "https://musicbrainz.org/work/d264e431-cb95-4751-9931-9eefadf4c1ee",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
