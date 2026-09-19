import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const sabrinaCarpenterHowToGoToConfession = {
  id: "01a0b723-cffd-7df8-9584-69b1b569015d",
  type: "page-type/song",
  slug: "sabrina-carpenter-how-to-go-to-confession",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "f9b7c475-fc3f-42f1-b626-7070c33ecbfe",
      externalLink: "https://musicbrainz.org/work/f9b7c475-fc3f-42f1-b626-7070c33ecbfe",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "How to Go to Confession",
  artist: "artist/sabrina-carpenter",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
