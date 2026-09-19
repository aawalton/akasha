import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayAeterna = {
  id: "01a0ba5d-3dc6-7447-890d-f3aa83dca623",
  type: "page-type/song",
  slug: "coldplay-aeterna",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "5f269326-7edf-4860-aa5b-99e2acf696a6",
      externalLink: "https://musicbrainz.org/work/5f269326-7edf-4860-aa5b-99e2acf696a6",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "AETERNA",
  artist: "artist/coldplay",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
