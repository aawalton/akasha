import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const sabrinaCarpenterTellEm = {
  id: "01a0b723-d9cb-7fe3-b521-a501a050e83b",
  type: "page-type/song",
  slug: "sabrina-carpenter-tell-em",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "e6523eeb-8559-46db-8499-fd56801e57cc",
      externalLink: "https://musicbrainz.org/work/e6523eeb-8559-46db-8499-fd56801e57cc",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Tell Em",
  artist: "artist/sabrina-carpenter",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
