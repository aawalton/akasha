import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const sabrinaCarpenterADreamIsAWishYourHeartMakes = {
  id: "01a0b723-beff-7ee0-af7e-fa223f0ac2bf",
  type: "page-type/song",
  slug: "sabrina-carpenter-a-dream-is-a-wish-your-heart-makes",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "003aea2a-c5c9-341f-a353-2df606bc223a",
      externalLink: "https://musicbrainz.org/work/003aea2a-c5c9-341f-a353-2df606bc223a",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "A Dream Is a Wish Your Heart Makes",
  artist: "artist/sabrina-carpenter",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
