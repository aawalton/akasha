import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const sabrinaCarpenterDontSmile = {
  id: "01a0b723-cdea-7a29-90b2-bbf740078f17",
  type: "page-type/song",
  slug: "sabrina-carpenter-dont-smile",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "dc90576c-73d6-4937-868d-217c11bf44ae",
      externalLink: "https://musicbrainz.org/work/dc90576c-73d6-4937-868d-217c11bf44ae",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Don’t Smile",
  artist: "artist/sabrina-carpenter",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
