import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const sabrinaCarpenterInMyBed = {
  id: "01a0b723-c715-7cd0-bae3-6888f4dd90d2",
  type: "page-type/song",
  slug: "sabrina-carpenter-in-my-bed",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "6f0fc4ac-024c-4fe3-ad14-91138f6247e8",
      externalLink: "https://musicbrainz.org/work/6f0fc4ac-024c-4fe3-ad14-91138f6247e8",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "In My Bed",
  artist: "artist/sabrina-carpenter",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
