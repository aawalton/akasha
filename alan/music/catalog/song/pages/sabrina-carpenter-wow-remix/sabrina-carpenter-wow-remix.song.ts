import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const sabrinaCarpenterWowRemix = {
  id: "01a0b723-d7d5-7a4f-b378-13b8d0b6be6a",
  type: "page-type/song",
  slug: "sabrina-carpenter-wow-remix",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "bd1ab8d8-d92d-4b3a-b6bc-1368eed04d71",
      externalLink: "https://musicbrainz.org/work/bd1ab8d8-d92d-4b3a-b6bc-1368eed04d71",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "WOW (remix)",
  artist: "artist/sabrina-carpenter",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
