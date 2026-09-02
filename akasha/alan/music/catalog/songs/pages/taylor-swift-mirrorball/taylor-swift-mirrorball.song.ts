import type { Song } from "../../song.page-type.ts"

export const taylorSwiftMirrorball = {
  id: "019ea416-3d24-7b71-8f41-cd23dba27f16",
  pageTypeSlug: "song",
  slug: "taylor-swift-mirrorball",
  title: "mirrorball",
  artistSlug: "taylor-swift",
  externalId: "ce6899e0-afcf-497f-b1a8-97c577cb0712",
  externalLink: "https://musicbrainz.org/work/ce6899e0-afcf-497f-b1a8-97c577cb0712",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  rank: "A",
  singability: "A",
  tags: ["masking"],
  lyrics: "txt",
  syncedLyrics: "txt",
  insights: "txt",
  personalConnections: "txt",
} as const satisfies Song
