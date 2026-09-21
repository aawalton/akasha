import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const emeiScatterbrain = {
  id: "01a0676a-d728-7054-9244-2e2006b40ea4",
  type: "page-type/release",
  slug: "emei-scatterbrain",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/emei"],
  position: 0,
  publishedAt: "2023-02-03",
  grade: "B",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0CUgWWL0bEnputEKbNiAsv",
      externalLink: "https://open.spotify.com/album/0CUgWWL0bEnputEKbNiAsv",
    },
  ],
  title: "Scatterbrain",
} as const satisfies Release
