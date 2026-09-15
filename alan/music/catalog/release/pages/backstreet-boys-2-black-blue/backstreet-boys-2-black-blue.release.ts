import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const backstreetBoys2BlackBlue = {
  id: "01a0676a-d719-7012-b975-5eb440a31f6d",
  type: "page-type/release",
  slug: "backstreet-boys-2-black-blue",
  title: "Black & Blue",
  partOfCollections: ["artist/backstreet-boys"],
  position: 0,
  ownLength: 47.932167,
  ownProgress: 47.932167,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2000-11-21",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "41zXjyVr6dzmchWf8tv3UO",
      externalLink: "https://open.spotify.com/album/41zXjyVr6dzmchWf8tv3UO",
    },
  ],
} as const satisfies Release
