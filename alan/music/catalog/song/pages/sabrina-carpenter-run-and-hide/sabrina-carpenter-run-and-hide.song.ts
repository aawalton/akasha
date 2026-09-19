import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const sabrinaCarpenterRunAndHide = {
  id: "01a0b723-c2b5-75d0-9c40-166ee73f0758",
  type: "page-type/song",
  slug: "sabrina-carpenter-run-and-hide",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "30c20b23-63db-4426-b862-c9826b30223a",
      externalLink: "https://musicbrainz.org/work/30c20b23-63db-4426-b862-c9826b30223a",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Run and Hide",
  artist: "artist/sabrina-carpenter",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
