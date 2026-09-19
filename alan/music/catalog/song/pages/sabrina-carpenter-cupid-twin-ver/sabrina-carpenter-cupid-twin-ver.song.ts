import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const sabrinaCarpenterCupidTwinVer = {
  id: "01a0b723-cabe-7fbd-9af4-7c0f23527a90",
  type: "page-type/song",
  slug: "sabrina-carpenter-cupid-twin-ver",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "a17834a2-5411-4495-a8a4-42940f482bca",
      externalLink: "https://musicbrainz.org/work/a17834a2-5411-4495-a8a4-42940f482bca",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Cupid (Twin ver.)",
  artist: "artist/sabrina-carpenter",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
