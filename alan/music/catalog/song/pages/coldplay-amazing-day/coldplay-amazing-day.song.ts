import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayAmazingDay = {
  id: "01a0ba5d-4757-7caa-8fdb-c020565ab2b1",
  type: "page-type/song",
  slug: "coldplay-amazing-day",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "cf6ccecf-6c40-4ae8-94c9-039a4b3d2699",
      externalLink: "https://musicbrainz.org/work/cf6ccecf-6c40-4ae8-94c9-039a4b3d2699",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Amazing Day",
  artist: "artist/coldplay",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
