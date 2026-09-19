import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const sabrinaCarpenterSlimPickins = {
  id: "01a0b723-d1d5-7e25-87d3-7659c98bec4b",
  type: "page-type/song",
  slug: "sabrina-carpenter-slim-pickins",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "2f230204-5a55-4e16-8179-f84fa349196f",
      externalLink: "https://musicbrainz.org/work/2f230204-5a55-4e16-8179-f84fa349196f",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Slim Pickins",
  artist: "artist/sabrina-carpenter",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
