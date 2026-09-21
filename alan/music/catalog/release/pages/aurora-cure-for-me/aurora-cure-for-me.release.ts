import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const auroraCureForMe = {
  id: "01a0676a-d71b-7044-8b0c-e41476d17179",
  type: "page-type/release",
  slug: "aurora-cure-for-me",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/aurora"],
  position: 0,
  publishedAt: "2022-10-31",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4GnjvWzip3cL7P0umc2bel",
      externalLink: "https://open.spotify.com/album/4GnjvWzip3cL7P0umc2bel",
    },
  ],
  title: "Cure For Me",
} as const satisfies Release
