import type { Song } from "../../song.page-type.ts"

export const taylorSwiftThisIsMeTrying = {
  id: "019ea416-49d9-7625-a543-9c6f1d9359d7",
  pageTypeSlug: "song",
  slug: "taylor-swift-this-is-me-trying",
  title: "this is me trying",
  artistSlug: "taylor-swift",
  externalId: "aef21e05-fd48-440c-beb2-6ddd2678cfbc",
  externalLink: "https://musicbrainz.org/work/aef21e05-fd48-440c-beb2-6ddd2678cfbc",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  rank: "A+",
  singability: "A+",
  tags: ["acceptance"],
  lyrics: "txt",
  syncedLyrics: "txt",
  insights: "txt",
  personalConnections: "txt",
} as const satisfies Song
