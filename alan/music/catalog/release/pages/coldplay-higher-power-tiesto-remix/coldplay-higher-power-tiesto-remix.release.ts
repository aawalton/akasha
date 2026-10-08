import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const coldplayHigherPowerTiestoRemix = {
  id: "01a0676a-d720-703e-acfd-785bfa10c205",
  type: "page-type/release",
  slug: "coldplay-higher-power-tiesto-remix",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/coldplay"],
  position: 0,
  publishedAt: "2021-06-04",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "31uapL5Q92IadPRWycdPKK",
      externalLink: "https://open.spotify.com/album/31uapL5Q92IadPRWycdPKK",
    },
  ],
  title: "Higher Power (Tiësto Remix)",
  createdAt: "2026-09-03T13:17:30.272Z",
  updatedAt: "2026-09-21T16:45:29.000Z",
} as const satisfies Release
