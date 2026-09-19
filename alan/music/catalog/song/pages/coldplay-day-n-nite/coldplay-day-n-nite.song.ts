import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayDayNNite = {
  id: "01a0ba5d-40d1-7dc7-b016-066a560c1f6b",
  type: "page-type/song",
  slug: "coldplay-day-n-nite",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "85b61dfd-2abd-4cf0-b5e3-d69257ca045b",
      externalLink: "https://musicbrainz.org/work/85b61dfd-2abd-4cf0-b5e3-d69257ca045b",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Day ’n’ Nite",
  artist: "artist/coldplay",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
