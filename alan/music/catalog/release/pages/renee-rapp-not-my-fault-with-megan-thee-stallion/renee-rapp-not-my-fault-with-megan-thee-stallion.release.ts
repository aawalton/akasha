import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const reneeRappNotMyFaultWithMeganTheeStallion = {
  id: "01a0676a-d725-707a-84f3-e5be3bf5d7b8",
  type: "page-type/release",
  slug: "renee-rapp-not-my-fault-with-megan-thee-stallion",
  grade: "B",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/renee-rapp"],
  position: 0,
  publishedAt: "2023-12-15",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0CUn0aYLhWWL6LBMFSoaJj",
      externalLink: "https://open.spotify.com/album/0CUn0aYLhWWL6LBMFSoaJj",
    },
  ],
  title: "Not My Fault (with Megan Thee Stallion)",
} as const satisfies Release
