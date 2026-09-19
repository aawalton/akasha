import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const sabrinaCarpenterHoneymoonFades = {
  id: "01a0b723-c3eb-757b-a99e-15a20e4e7357",
  type: "page-type/song",
  slug: "sabrina-carpenter-honeymoon-fades",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "3c70f413-6e7c-4436-994d-de38a3408fa9",
      externalLink: "https://musicbrainz.org/work/3c70f413-6e7c-4436-994d-de38a3408fa9",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Honeymoon Fades",
  artist: "artist/sabrina-carpenter",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
