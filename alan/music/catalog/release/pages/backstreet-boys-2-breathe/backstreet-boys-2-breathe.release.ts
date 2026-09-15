import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const backstreetBoys2Breathe = {
  id: "01a0676a-d719-7036-b748-ede7d2ce408c",
  type: "release",
  slug: "backstreet-boys-2-breathe",
  title: "Breathe",
  partOfCollections: ["artist/backstreet-boys"],
  position: 0,
  ownLength: 3.108217,
  ownProgress: 3.108217,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2019-01-18",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3wkAyn5E9eDgKpTIAnEMFU",
      externalLink: "https://open.spotify.com/album/3wkAyn5E9eDgKpTIAnEMFU",
    },
  ],
} as const satisfies Release
