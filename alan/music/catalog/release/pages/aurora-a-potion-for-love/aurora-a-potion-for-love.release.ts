import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const auroraAPotionForLove = {
  id: "01a0676a-d715-703a-924b-79f07841e0fa",
  type: "page-type/release",
  slug: "aurora-a-potion-for-love",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/aurora"],
  position: 0,
  publishedAt: "2022-07-29",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "54RiYX8ONUdOOxerMzADqA",
      externalLink: "https://open.spotify.com/album/54RiYX8ONUdOOxerMzADqA",
    },
  ],
  title: "A Potion For Love",
} as const satisfies Release
