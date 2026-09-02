import type { Song } from "../../song.page-type.ts"

export const taylorSwiftNeverGrowUp = {
  id: "019ea416-3dfa-7293-9f7c-209dae686435",
  pageTypeSlug: "song",
  slug: "taylor-swift-never-grow-up",
  title: "Never Grow Up",
  artistSlug: "taylor-swift",
  externalId: "d81df650-873c-3a8d-a021-bf66f1cc5804",
  externalLink: "https://musicbrainz.org/work/d81df650-873c-3a8d-a021-bf66f1cc5804",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
