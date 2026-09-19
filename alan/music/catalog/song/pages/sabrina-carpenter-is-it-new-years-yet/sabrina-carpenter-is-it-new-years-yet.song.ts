import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const sabrinaCarpenterIsItNewYearsYet = {
  id: "01a0b723-c395-7d5f-b848-1456c4a9a26d",
  type: "page-type/song",
  slug: "sabrina-carpenter-is-it-new-years-yet",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "35445314-71ad-47b1-bdc8-2ccc7da705c6",
      externalLink: "https://musicbrainz.org/work/35445314-71ad-47b1-bdc8-2ccc7da705c6",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "is it new years yet?",
  artist: "artist/sabrina-carpenter",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
