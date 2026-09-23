import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const taylorSwift2TheCruelestSummer = {
  id: "01a0676a-d72c-7045-9ba4-28a6f6927898",
  type: "page-type/release",
  slug: "taylor-swift-2-the-cruelest-summer",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/taylor-swift"],
  position: 0,
  publishedAt: "2023-10-19",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "12A1Byk8EpqzaHSw12nKyW",
      externalLink: "https://open.spotify.com/album/12A1Byk8EpqzaHSw12nKyW",
    },
  ],
  title: "The Cruelest Summer",
} as const satisfies Release
