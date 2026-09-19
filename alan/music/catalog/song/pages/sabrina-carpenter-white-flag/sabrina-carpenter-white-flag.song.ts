import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const sabrinaCarpenterWhiteFlag = {
  id: "01a0b723-d475-7876-819b-c04111518b1e",
  type: "page-type/song",
  slug: "sabrina-carpenter-white-flag",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "621384f6-8414-404a-b757-7a362c74b6bf",
      externalLink: "https://musicbrainz.org/work/621384f6-8414-404a-b757-7a362c74b6bf",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "White Flag",
  artist: "artist/sabrina-carpenter",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
