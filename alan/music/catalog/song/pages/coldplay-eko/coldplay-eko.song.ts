import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayEko = {
  id: "01a0ba5d-3fcd-787c-878b-6e5d6b2ef951",
  type: "page-type/song",
  slug: "coldplay-eko",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "7c26b6fc-baf7-4f90-8efe-38885f36eb2f",
      externalLink: "https://musicbrainz.org/work/7c26b6fc-baf7-4f90-8efe-38885f36eb2f",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Èkó",
  artist: "artist/coldplay",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
