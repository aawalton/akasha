import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const sabrinaCarpenterTakeYouBack = {
  id: "01a0b723-d6ff-7a61-a024-509bd33c2968",
  type: "page-type/song",
  slug: "sabrina-carpenter-take-you-back",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "ae50c0d4-5fb5-4a0c-aa0e-e7ffc549dc80",
      externalLink: "https://musicbrainz.org/work/ae50c0d4-5fb5-4a0c-aa0e-e7ffc549dc80",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Take You Back",
  artist: "artist/sabrina-carpenter",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
