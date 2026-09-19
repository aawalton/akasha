import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayDontPanic = {
  id: "01a0ba5d-4482-7d8e-941e-d80e331f2209",
  type: "page-type/song",
  slug: "coldplay-dont-panic",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "b36afced-203f-3cb7-b66c-569ba7a3c56d",
      externalLink: "https://musicbrainz.org/work/b36afced-203f-3cb7-b66c-569ba7a3c56d",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Don’t Panic",
  artist: "artist/coldplay",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
