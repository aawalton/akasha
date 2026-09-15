import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const clairoSofia = {
  id: "01a0676a-d729-704a-8278-48790bab1195",
  type: "release",
  slug: "clairo-sofia",
  title: "Sofia",
  partOfCollections: ["artist/clairo"],
  position: 0,
  ownLength: 3.139767,
  ownProgress: 3.139767,
  unit: "unit/minutes",
  status: "completed",
  rank: "B",
  publishedAt: "2019-07-26",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7Lwye9LylZFzb0AAQNgzU4",
      externalLink: "https://open.spotify.com/album/7Lwye9LylZFzb0AAQNgzU4",
    },
  ],
} as const satisfies Release
