import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayBillieJean = {
  id: "01a0ba5d-3a0c-715f-a691-aeb86411ea46",
  type: "page-type/song",
  slug: "coldplay-billie-jean",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "19fff9d4-5a0b-3afd-ba7b-eb59d5f09d08",
      externalLink: "https://musicbrainz.org/work/19fff9d4-5a0b-3afd-ba7b-eb59d5f09d08",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Billie Jean",
  artist: "artist/coldplay",
  songType: "derivative",
  performed: true,
} as const satisfies Song
