import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftMirrorball = {
  id: "019ea416-3d24-7b71-8f41-cd23dba27f16",
  type: "page-type/song",
  slug: "taylor-swift-mirrorball",
  rank: "A",
  tags: ["masking"],
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "ce6899e0-afcf-497f-b1a8-97c577cb0712",
      externalLink: "https://musicbrainz.org/work/ce6899e0-afcf-497f-b1a8-97c577cb0712",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "mirrorball",
  artist: "artist/taylor-swift",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  singability: "A",
  lyrics: "txt",
  syncedLyrics: "txt",
  insights: "txt",
  personalConnections: "txt",
} as const satisfies Song
