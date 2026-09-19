import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayAlwaysInMyHead = {
  id: "01a0ba5d-39d4-73a5-b114-e6acaf735119",
  type: "page-type/song",
  slug: "coldplay-always-in-my-head",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "183d78c7-0260-462d-9004-41e2307fe904",
      externalLink: "https://musicbrainz.org/work/183d78c7-0260-462d-9004-41e2307fe904",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Always in My Head",
  artist: "artist/coldplay",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
