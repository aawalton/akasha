import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const sabrinaCarpenterTaste = {
  id: "01a0b723-d693-745b-a510-d46f540f4b39",
  type: "page-type/song",
  slug: "sabrina-carpenter-taste",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "a869f08c-88a0-4b9c-b2e1-1a08c0f2db78",
      externalLink: "https://musicbrainz.org/work/a869f08c-88a0-4b9c-b2e1-1a08c0f2db78",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Taste",
  artist: "artist/sabrina-carpenter",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
