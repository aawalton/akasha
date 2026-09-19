import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const sabrinaCarpenterBadTime = {
  id: "01a0b723-cbff-7b47-a65d-3797148963cb",
  type: "page-type/song",
  slug: "sabrina-carpenter-bad-time",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "b5fb8748-9c71-403d-8bf0-d3071401bf41",
      externalLink: "https://musicbrainz.org/work/b5fb8748-9c71-403d-8bf0-d3071401bf41",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Bad Time",
  artist: "artist/sabrina-carpenter",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
