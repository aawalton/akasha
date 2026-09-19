import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaBringYourArms = {
  id: "019ea4c3-bd7b-703d-bbcc-f157531641ed",
  type: "page-type/song",
  slug: "sia-bring-your-arms",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "51147f90-9fd9-4367-bd70-48838361bcb6",
      externalLink: "https://musicbrainz.org/work/51147f90-9fd9-4367-bd70-48838361bcb6",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Bring Your Arms",
  artist: "artist/sia",
  songType: "original",
  performed: false,
  written: "collab",
} as const satisfies Song
