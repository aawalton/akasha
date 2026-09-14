import type { Release } from "akasha/alan/music/catalog/releases/release.page-type.types.ts"

export const backstreetBoys2NeverGone = {
  id: "01a0676a-d725-7049-85c9-aa8164b7fc03",
  type: "release",
  slug: "backstreet-boys-2-never-gone",
  title: "Never Gone",
  partOfCollections: ["artist/backstreet-boys"],
  position: 0,
  ownLength: 47.6226,
  ownProgress: 47.6226,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2005-06-14",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1Wz9PANLXjaOskUv575hRV",
      externalLink: "https://open.spotify.com/album/1Wz9PANLXjaOskUv575hRV",
    },
  ],
} as const satisfies Release
