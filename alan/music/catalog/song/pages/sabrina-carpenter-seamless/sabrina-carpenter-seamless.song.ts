import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const sabrinaCarpenterSeamless = {
  id: "01a0b723-d657-73cb-ba7e-e7e0be5c9cb1",
  type: "page-type/song",
  slug: "sabrina-carpenter-seamless",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "a6c5315f-d8c7-44e9-b2eb-84f03be50abc",
      externalLink: "https://musicbrainz.org/work/a6c5315f-d8c7-44e9-b2eb-84f03be50abc",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Seamless",
  artist: "artist/sabrina-carpenter",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
