import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayO = {
  id: "01a0ba60-fddf-7915-aa40-f9005f77f5fe",
  type: "page-type/song",
  slug: "coldplay-o",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "ee5a4d3d-ba0c-4c5a-a3a9-ccacf0c71921",
      externalLink: "https://musicbrainz.org/work/ee5a4d3d-ba0c-4c5a-a3a9-ccacf0c71921",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "O",
  artist: "artist/coldplay",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
