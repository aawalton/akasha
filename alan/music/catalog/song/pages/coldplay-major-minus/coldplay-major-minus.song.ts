import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayMajorMinus = {
  id: "01a0ba5d-51c6-757f-9cd0-cd2b252d5766",
  type: "page-type/song",
  slug: "coldplay-major-minus",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "5b60ce15-fa19-4818-8c34-2bd59467b716",
      externalLink: "https://musicbrainz.org/work/5b60ce15-fa19-4818-8c34-2bd59467b716",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Major Minus",
  artist: "artist/coldplay",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
