import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const sabrinaCarpenterFeelsLikeLoneliness = {
  id: "01a0b723-bf8c-7edb-ba23-217c37127e29",
  type: "page-type/song",
  slug: "sabrina-carpenter-feels-like-loneliness",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "01ba73ee-80c6-4472-8436-87be5717d2ce",
      externalLink: "https://musicbrainz.org/work/01ba73ee-80c6-4472-8436-87be5717d2ce",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Feels Like Loneliness",
  artist: "artist/sabrina-carpenter",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
