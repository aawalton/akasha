import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const sabrinaCarpenterTheMiddleOfStartingOver = {
  id: "01a0b723-d5e9-701e-b031-b30abc2d2b25",
  type: "page-type/song",
  slug: "sabrina-carpenter-the-middle-of-starting-over",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "996bba76-da52-4b08-bd82-59910026fd18",
      externalLink: "https://musicbrainz.org/work/996bba76-da52-4b08-bd82-59910026fd18",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "The Middle of Starting Over",
  artist: "artist/sabrina-carpenter",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
