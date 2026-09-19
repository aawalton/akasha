import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const sabrinaCarpenterSharpestTool = {
  id: "01a0b723-d8e6-7c50-9c6b-35e6bc17fd89",
  type: "page-type/song",
  slug: "sabrina-carpenter-sharpest-tool",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "db96c6c1-329a-41ec-9fca-4588143af5cf",
      externalLink: "https://musicbrainz.org/work/db96c6c1-329a-41ec-9fca-4588143af5cf",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Sharpest Tool",
  artist: "artist/sabrina-carpenter",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
