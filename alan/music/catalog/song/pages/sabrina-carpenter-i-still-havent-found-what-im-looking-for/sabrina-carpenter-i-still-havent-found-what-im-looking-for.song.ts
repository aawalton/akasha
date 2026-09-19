import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const sabrinaCarpenterIStillHaventFoundWhatImLookingFor = {
  id: "01a0b723-ccb3-7e88-9a46-820577ceebcb",
  type: "page-type/song",
  slug: "sabrina-carpenter-i-still-havent-found-what-im-looking-for",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "c2f9c697-a90e-3e7d-b2c2-173a26b0d517",
      externalLink: "https://musicbrainz.org/work/c2f9c697-a90e-3e7d-b2c2-173a26b0d517",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "I Still Haven’t Found What I’m Looking For",
  artist: "artist/sabrina-carpenter",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
