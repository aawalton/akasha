import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const sabrinaCarpenterBestThingIGot = {
  id: "01a0b723-cd1e-7e78-b89e-1cb2b1df6350",
  type: "page-type/song",
  slug: "sabrina-carpenter-best-thing-i-got",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "c4e97269-3c89-4f54-ab09-b738dfa7d954",
      externalLink: "https://musicbrainz.org/work/c4e97269-3c89-4f54-ab09-b738dfa7d954",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Best Thing I Got",
  artist: "artist/sabrina-carpenter",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
