import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const sabrinaCarpenterGoodGraces = {
  id: "01a0b723-c20c-7cf5-bb26-793c5edfa1ec",
  type: "page-type/song",
  slug: "sabrina-carpenter-good-graces",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "284d4ba4-9756-47d5-b32d-bd9a00411edd",
      externalLink: "https://musicbrainz.org/work/284d4ba4-9756-47d5-b32d-bd9a00411edd",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Good Graces",
  artist: "artist/sabrina-carpenter",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
