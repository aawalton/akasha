import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const sabrinaCarpenterRightNow = {
  id: "01a0b723-c485-735e-b2a8-3204c4a8271d",
  type: "page-type/song",
  slug: "sabrina-carpenter-right-now",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "4a5be182-e5ab-4b0a-b3be-1b2629f2c878",
      externalLink: "https://musicbrainz.org/work/4a5be182-e5ab-4b0a-b3be-1b2629f2c878",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Right Now",
  artist: "artist/sabrina-carpenter",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
