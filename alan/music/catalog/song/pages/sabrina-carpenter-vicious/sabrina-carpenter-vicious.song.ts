import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const sabrinaCarpenterVicious = {
  id: "01a0b723-d6cb-77ac-bf3d-cb28d6693775",
  type: "page-type/song",
  slug: "sabrina-carpenter-vicious",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "adbc8d2d-ba2d-42c1-8be6-d3b482f7f590",
      externalLink: "https://musicbrainz.org/work/adbc8d2d-ba2d-42c1-8be6-d3b482f7f590",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Vicious",
  artist: "artist/sabrina-carpenter",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
