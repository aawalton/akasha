import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const auroraAPotionForLove = {
  id: "01a0676a-d715-703a-924b-79f07841e0fa",
  type: "release",
  slug: "aurora-a-potion-for-love",
  title: "A Potion For Love",
  partOfCollections: ["artist/aurora"],
  position: 0,
  ownLength: 3.6071,
  ownProgress: 3.6071,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2022-07-29",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "54RiYX8ONUdOOxerMzADqA",
      externalLink: "https://open.spotify.com/album/54RiYX8ONUdOOxerMzADqA",
    },
  ],
} as const satisfies Release
