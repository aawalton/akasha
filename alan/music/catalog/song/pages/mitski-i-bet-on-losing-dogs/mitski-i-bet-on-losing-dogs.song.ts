import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const mitskiIBetOnLosingDogs = {
  id: "019f0ea7-d3d6-7446-a0c5-c1311ff30b05",
  type: "page-type/song",
  slug: "mitski-i-bet-on-losing-dogs",
  rank: "C+",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "e68e111a-c64d-462e-8531-75055c3d728f",
      externalLink: "https://musicbrainz.org/work/e68e111a-c64d-462e-8531-75055c3d728f",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "I Bet on Losing Dogs",
  artist: "artist/mitski",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  singability: "C-",
  lyrics: "txt",
  syncedLyrics: "txt",
  insights: "txt",
  personalConnections: "txt",
} as const satisfies Song
