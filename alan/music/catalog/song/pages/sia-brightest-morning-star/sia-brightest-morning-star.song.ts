import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaBrightestMorningStar = {
  id: "019ea4c3-dc12-74a1-97d1-6b9d4dd667e6",
  type: "page-type/song",
  slug: "sia-brightest-morning-star",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "54a3ccf7-e7d6-4742-ac7f-7d9b53d328a4",
      externalLink: "https://musicbrainz.org/work/54a3ccf7-e7d6-4742-ac7f-7d9b53d328a4",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Brightest Morning Star",
  artist: "artist/sia",
  songType: "original",
  performed: false,
  written: "collab",
} as const satisfies Song
