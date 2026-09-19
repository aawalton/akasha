import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const sabrinaCarpenterSueMe = {
  id: "01a0b723-d19c-7fdb-9aad-a6daea97349b",
  type: "page-type/song",
  slug: "sabrina-carpenter-sue-me",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "2125d1a1-e0f5-43b2-b3b8-31dd4f326591",
      externalLink: "https://musicbrainz.org/work/2125d1a1-e0f5-43b2-b3b8-31dd4f326591",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Sue Me",
  artist: "artist/sabrina-carpenter",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
