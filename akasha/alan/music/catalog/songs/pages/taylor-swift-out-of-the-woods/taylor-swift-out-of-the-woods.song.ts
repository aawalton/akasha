import type { Song } from "../../song.page-type.ts"

export const taylorSwiftOutOfTheWoods = {
  id: "019ea416-2fb4-74ae-b45f-d0c33c04a27a",
  pageTypeSlug: "song",
  slug: "taylor-swift-out-of-the-woods",
  title: "Out of the Woods",
  artistSlug: "taylor-swift",
  externalId: "1e459e1f-65f0-4e88-94a5-e7c530b11dc9",
  externalLink: "https://musicbrainz.org/work/1e459e1f-65f0-4e88-94a5-e7c530b11dc9",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
