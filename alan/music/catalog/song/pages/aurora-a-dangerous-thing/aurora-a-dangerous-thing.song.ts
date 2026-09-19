import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const auroraADangerousThing = {
  id: "019ea4a2-ff9b-7b28-8f24-6f5fb7de4d1f",
  type: "page-type/song",
  slug: "aurora-a-dangerous-thing",
  rank: "A",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "0c390168-525f-4fb3-b2b9-1e0b5127ea8e",
      externalLink: "https://musicbrainz.org/work/0c390168-525f-4fb3-b2b9-1e0b5127ea8e",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "A Dangerous Thing",
  artist: "artist/aurora",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  singability: "B",
  lyrics: "txt",
  syncedLyrics: "txt",
  insights: "txt",
  personalConnections: "txt",
} as const satisfies Song
