import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const billieEilishHitMeHardAndSoft = {
  id: "01a0676a-d720-7044-a61a-bfa9a4b9867d",
  type: "page-type/release",
  slug: "billie-eilish-hit-me-hard-and-soft",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/billie-eilish"],
  position: 0,
  publishedAt: "2024-05-17",
  rank: "A",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7aJuG4TFXa2hmE4z1yxc3n",
      externalLink: "https://open.spotify.com/album/7aJuG4TFXa2hmE4z1yxc3n",
    },
  ],
  title: "HIT ME HARD AND SOFT",
} as const satisfies Release
