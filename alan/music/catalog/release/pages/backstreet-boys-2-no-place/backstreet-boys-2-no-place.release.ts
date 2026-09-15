import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const backstreetBoys2NoPlace = {
  id: "01a0676a-d725-7066-a4da-e6e5ad3ef98f",
  type: "release",
  slug: "backstreet-boys-2-no-place",
  title: "No Place",
  partOfCollections: ["artist/backstreet-boys"],
  position: 0,
  ownLength: 2.995767,
  ownProgress: 2.995767,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2019-01-04",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2f4X9NdtXsuviPawMTYm1D",
      externalLink: "https://open.spotify.com/album/2f4X9NdtXsuviPawMTYm1D",
    },
  ],
} as const satisfies Release
