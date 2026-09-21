import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const coldplayAllMyLovePnauXColdplay = {
  id: "01a0676a-d716-7022-aa54-961c5adfd22c",
  type: "page-type/release",
  slug: "coldplay-all-my-love-pnau-x-coldplay",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/coldplay"],
  position: 0,
  publishedAt: "2024-11-29",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5ndvwHbg1XuPobvdNIhguO",
      externalLink: "https://open.spotify.com/album/5ndvwHbg1XuPobvdNIhguO",
    },
  ],
  title: "ALL MY LOVE (PNAU x Coldplay)",
} as const satisfies Release
