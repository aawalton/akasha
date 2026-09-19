import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const sabrinaCarpenterYoureAMeanOneMrGrinch = {
  id: "01a0b723-d61f-7bea-b73b-1d8450d59833",
  type: "page-type/song",
  slug: "sabrina-carpenter-youre-a-mean-one-mr-grinch",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "9d81582a-5170-4152-a69b-db9ece659b3c",
      externalLink: "https://musicbrainz.org/work/9d81582a-5170-4152-a69b-db9ece659b3c",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "You’re a Mean One, Mr. Grinch",
  artist: "artist/sabrina-carpenter",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
