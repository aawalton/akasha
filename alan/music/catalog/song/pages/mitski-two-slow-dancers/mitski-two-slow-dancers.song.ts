import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const mitskiTwoSlowDancers = {
  id: "019f0e9c-0a93-7b5a-96a6-9748794a6394",
  type: "page-type/song",
  slug: "mitski-two-slow-dancers",
  rank: "B+",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "08f03981-bc62-4e7f-80e8-1c38d7110d2a",
      externalLink: "https://musicbrainz.org/work/08f03981-bc62-4e7f-80e8-1c38d7110d2a",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Two Slow Dancers",
  artist: "artist/mitski",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  singability: "B-",
  lyrics: "txt",
  syncedLyrics: "txt",
  insights: "txt",
  personalConnections: "txt",
} as const satisfies Song
