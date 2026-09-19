import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayTheGoldrush = {
  id: "01a0ba60-fdab-75d4-bfc1-ff457af7b370",
  type: "page-type/song",
  slug: "coldplay-the-goldrush",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "ede2afbb-c49e-4105-bcdb-3e3f37196e0c",
      externalLink: "https://musicbrainz.org/work/ede2afbb-c49e-4105-bcdb-3e3f37196e0c",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "The Goldrush",
  artist: "artist/coldplay",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
