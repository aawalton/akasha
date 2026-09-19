import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const billieEilishIdontwannabeyouanymore = {
  id: "019ea4a8-9642-70d1-8bd2-dc04be6d71a8",
  type: "page-type/song",
  slug: "billie-eilish-idontwannabeyouanymore",
  rank: "S-",
  tags: ["self-hatred"],
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "1ed1c00c-a459-4aba-97ee-4bc8a33b25d3",
      externalLink: "https://musicbrainz.org/work/1ed1c00c-a459-4aba-97ee-4bc8a33b25d3",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "idontwannabeyouanymore",
  artist: "artist/billie-eilish",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  singability: "B+",
  lyrics: "txt",
  syncedLyrics: "txt",
  insights: "txt",
  personalConnections: "txt",
} as const satisfies Song
