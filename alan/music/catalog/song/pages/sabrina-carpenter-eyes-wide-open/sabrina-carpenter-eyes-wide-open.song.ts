import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const sabrinaCarpenterEyesWideOpen = {
  id: "01a0b723-c8b5-7607-a9fb-5fad85ef30e1",
  type: "page-type/song",
  slug: "sabrina-carpenter-eyes-wide-open",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "81d3d04e-bd24-459e-a468-d368c43f5d78",
      externalLink: "https://musicbrainz.org/work/81d3d04e-bd24-459e-a468-d368c43f5d78",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Eyes Wide Open",
  artist: "artist/sabrina-carpenter",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
