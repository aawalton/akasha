import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const sabrinaCarpenterTakeOnTheWorld = {
  id: "01a0b723-d96e-734c-9321-2224f2b36c01",
  type: "page-type/song",
  slug: "sabrina-carpenter-take-on-the-world",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "e2c27ce1-901e-4152-b891-49abfc65a885",
      externalLink: "https://musicbrainz.org/work/e2c27ce1-901e-4152-b891-49abfc65a885",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Take on the World",
  artist: "artist/sabrina-carpenter",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
