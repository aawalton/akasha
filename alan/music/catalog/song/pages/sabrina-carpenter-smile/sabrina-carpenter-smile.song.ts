import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const sabrinaCarpenterSmile = {
  id: "01a0b723-d86f-7823-a064-8bc9e3bf24e0",
  type: "page-type/song",
  slug: "sabrina-carpenter-smile",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "d00397c2-396d-4e54-bb5b-b1d9e36919a8",
      externalLink: "https://musicbrainz.org/work/d00397c2-396d-4e54-bb5b-b1d9e36919a8",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Smile",
  artist: "artist/sabrina-carpenter",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
