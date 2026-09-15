import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const linkinParkFromZeroDeluxeEdition = {
  id: "01a0676a-d71e-7041-ba46-81cb92e42bbc",
  type: "page-type/release",
  slug: "linkin-park-from-zero-deluxe-edition",
  title: "From Zero (Deluxe Edition)",
  partOfCollections: ["artist/linkin-park"],
  position: 0,
  ownLength: 41.77675,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2025-05-16",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5QfFvOMOJ0CrIDmu33RmSJ",
      externalLink: "https://open.spotify.com/album/5QfFvOMOJ0CrIDmu33RmSJ",
    },
  ],
} as const satisfies Release
