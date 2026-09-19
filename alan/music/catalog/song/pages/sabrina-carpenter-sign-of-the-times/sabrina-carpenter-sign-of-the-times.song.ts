import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const sabrinaCarpenterSignOfTheTimes = {
  id: "01a0b723-d8b8-7a52-b63f-729927a008e0",
  type: "page-type/song",
  slug: "sabrina-carpenter-sign-of-the-times",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "d13f7399-2b48-4a9e-92fa-c94965a9d2bf",
      externalLink: "https://musicbrainz.org/work/d13f7399-2b48-4a9e-92fa-c94965a9d2bf",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Sign of the Times",
  artist: "artist/sabrina-carpenter",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
