import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const sabrinaCarpenterHouseTour = {
  id: "01a0b723-ca2f-78e7-9b7c-405eb5d554e2",
  type: "page-type/song",
  slug: "sabrina-carpenter-house-tour",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "9826042a-a767-4f94-99fe-27625b2d5383",
      externalLink: "https://musicbrainz.org/work/9826042a-a767-4f94-99fe-27625b2d5383",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "House Tour",
  artist: "artist/sabrina-carpenter",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
