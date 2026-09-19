import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const sabrinaCarpenterMonaLisa = {
  id: "01a0b723-ce60-7f26-a9de-29a2be6533d5",
  type: "page-type/song",
  slug: "sabrina-carpenter-mona-lisa",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "e1dd2b65-31ef-4c4d-8157-3909c0fbd7ef",
      externalLink: "https://musicbrainz.org/work/e1dd2b65-31ef-4c4d-8157-3909c0fbd7ef",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Mona Lisa",
  artist: "artist/sabrina-carpenter",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
