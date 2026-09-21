import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const auroraDaydreamerKdaLondonDub = {
  id: "01a0676a-d71b-706d-8486-480a48d3ddae",
  type: "page-type/release",
  slug: "aurora-daydreamer-kda-london-dub",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/aurora"],
  position: 0,
  publishedAt: "2019-11-01",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7n5MsXEnd49U0yTt4JuQyI",
      externalLink: "https://open.spotify.com/album/7n5MsXEnd49U0yTt4JuQyI",
    },
  ],
  title: "Daydreamer (KDA London Dub)",
} as const satisfies Release
