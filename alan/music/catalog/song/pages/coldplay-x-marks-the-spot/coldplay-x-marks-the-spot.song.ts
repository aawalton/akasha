import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayXMarksTheSpot = {
  id: "01a0ba60-ff2b-7845-9e10-7aad678373b7",
  type: "page-type/song",
  slug: "coldplay-x-marks-the-spot",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "0fe24351-d69f-41e3-8b6b-97e31b0be8be",
      externalLink: "https://musicbrainz.org/work/0fe24351-d69f-41e3-8b6b-97e31b0be8be",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "X Marks the Spot",
  artist: "artist/coldplay",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
