import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const backstreetBoys2Unbreakable = {
  id: "01a0676a-d72f-702f-a0c6-abcce2cab48d",
  type: "page-type/release",
  slug: "backstreet-boys-2-unbreakable",
  title: "Unbreakable",
  partOfCollections: ["artist/backstreet-boys"],
  position: 0,
  ownLength: 55.836117,
  ownProgress: 55.836117,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2007-10-24",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3dJhkG64rXbA2PtBLBGFVd",
      externalLink: "https://open.spotify.com/album/3dJhkG64rXbA2PtBLBGFVd",
    },
  ],
} as const satisfies Release
