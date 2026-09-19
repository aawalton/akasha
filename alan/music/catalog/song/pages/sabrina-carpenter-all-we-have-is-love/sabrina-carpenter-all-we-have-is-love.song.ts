import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const sabrinaCarpenterAllWeHaveIsLove = {
  id: "01a0b723-c081-71e2-ab0c-b3bc6c752442",
  type: "page-type/song",
  slug: "sabrina-carpenter-all-we-have-is-love",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "13bc6c24-dd44-44aa-a87f-9750f5113d41",
      externalLink: "https://musicbrainz.org/work/13bc6c24-dd44-44aa-a87f-9750f5113d41",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "All We Have Is Love",
  artist: "artist/sabrina-carpenter",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
