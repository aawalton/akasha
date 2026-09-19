import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const sabrinaCarpenterThumbs = {
  id: "01a0b723-d811-753d-ac14-936a858d3591",
  type: "page-type/song",
  slug: "sabrina-carpenter-thumbs",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "c350a369-b688-4f40-b71d-bb32d9aca16b",
      externalLink: "https://musicbrainz.org/work/c350a369-b688-4f40-b71d-bb32d9aca16b",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Thumbs",
  artist: "artist/sabrina-carpenter",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
