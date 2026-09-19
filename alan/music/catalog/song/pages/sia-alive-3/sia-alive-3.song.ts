import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaAlive3 = {
  id: "019ea4c6-6d40-7c03-8b76-a28f384ae1ac",
  type: "page-type/song",
  slug: "sia-alive-3",
  rank: "S",
  tags: ["suicide"],
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "1f23fb30-74b0-4d87-b3e4-0e580c6eb140",
      externalLink: "https://musicbrainz.org/work/1f23fb30-74b0-4d87-b3e4-0e580c6eb140",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Alive",
  artist: "artist/sia",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  singability: "S-",
  lyrics: "txt",
  syncedLyrics: "txt",
  insights: "txt",
  personalConnections: "txt",
} as const satisfies Song
