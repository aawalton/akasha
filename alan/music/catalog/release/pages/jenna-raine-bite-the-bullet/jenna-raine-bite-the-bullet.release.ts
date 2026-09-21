import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const jennaRaineBiteTheBullet = {
  id: "01a0676a-d719-700f-a17a-b4db3e410806",
  type: "page-type/release",
  slug: "jenna-raine-bite-the-bullet",
  grade: "B",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/jenna-raine"],
  position: 0,
  publishedAt: "2025-07-11",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5E5Bh3gHUFO3ECImoixFwC",
      externalLink: "https://open.spotify.com/album/5E5Bh3gHUFO3ECImoixFwC",
    },
  ],
  title: "BITE THE BULLET",
} as const satisfies Release
