import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const gracieAbramsThisIsWhatItFeelsLike = {
  id: "01a0676a-d72e-7031-88bf-14160fa0ff1a",
  type: "page-type/release",
  slug: "gracie-abrams-this-is-what-it-feels-like",
  title: "This Is What It Feels Like",
  partOfCollections: ["artist/gracie-abrams"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  grade: "B",
  publishedAt: "2021-11-12",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7l2g05NyprwonSFIs2y8at",
      externalLink: "https://open.spotify.com/album/7l2g05NyprwonSFIs2y8at",
    },
  ],
  createdAt: "2026-09-03T13:17:30.286Z",
  updatedAt: "2026-10-15T14:00:33.419Z",
} as const satisfies Release
