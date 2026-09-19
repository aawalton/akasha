import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const sabrinaCarpenterLonesome = {
  id: "01a0b723-c776-7406-9064-db7cc403568d",
  type: "page-type/song",
  slug: "sabrina-carpenter-lonesome",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "72ce2876-fb4d-4720-9e20-0faeede27795",
      externalLink: "https://musicbrainz.org/work/72ce2876-fb4d-4720-9e20-0faeede27795",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Lonesome",
  artist: "artist/sabrina-carpenter",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
