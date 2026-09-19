import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const alexandriaIDidNotLoveYou = {
  id: "01a0b726-8edb-77b6-95b6-816e89e09a21",
  type: "page-type/song",
  slug: "alexandria-i-did-not-love-you",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "1585d618-f0da-48e9-9ec1-3ed1022db512",
      externalLink: "https://musicbrainz.org/recording/1585d618-f0da-48e9-9ec1-3ed1022db512",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "I Did Not Love You",
  artist: "artist/alexandria",
  songType: "original",
  performed: true,
} as const satisfies Song
