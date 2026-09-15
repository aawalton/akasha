import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const coldplayHigherPowerTiestoRemix = {
  id: "01a0676a-d720-703e-acfd-785bfa10c205",
  type: "page-type/release",
  slug: "coldplay-higher-power-tiesto-remix",
  title: "Higher Power (Tiësto Remix)",
  partOfCollections: ["artist/coldplay"],
  position: 0,
  ownLength: 3.826083,
  ownProgress: 3.826083,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2021-06-04",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "31uapL5Q92IadPRWycdPKK",
      externalLink: "https://open.spotify.com/album/31uapL5Q92IadPRWycdPKK",
    },
  ],
} as const satisfies Release
