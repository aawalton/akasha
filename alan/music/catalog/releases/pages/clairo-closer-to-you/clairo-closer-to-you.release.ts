import type { Release } from "akasha/alan/music/catalog/releases/release.page-type.types.ts"

export const clairoCloserToYou = {
  id: "01a0676a-d71b-7003-8585-58e796b5422c",
  type: "release",
  slug: "clairo-closer-to-you",
  title: "Closer To You",
  partOfCollections: ["artist/clairo"],
  position: 0,
  ownLength: 3.07155,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2019-06-26",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "08cNjr1Fd1HqZE4m2ylB2p",
      externalLink: "https://open.spotify.com/album/08cNjr1Fd1HqZE4m2ylB2p",
    },
  ],
} as const satisfies Release
