import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const sabrinaCarpenterDontWantItBack = {
  id: "01a0b723-c824-7df9-bfdb-482db4f81093",
  type: "page-type/song",
  slug: "sabrina-carpenter-dont-want-it-back",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "7d018a27-e5e8-4d68-98f9-08f69ebe3336",
      externalLink: "https://musicbrainz.org/work/7d018a27-e5e8-4d68-98f9-08f69ebe3336",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Don’t Want It Back",
  artist: "artist/sabrina-carpenter",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
