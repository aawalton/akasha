import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const emeiDonTKnowAboutTheWorld = {
  id: "01a0676a-d71c-7021-8c2a-1de193d8efa0",
  type: "page-type/release",
  slug: "emei-don-t-know-about-the-world",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/emei"],
  position: 0,
  publishedAt: "2023-09-15",
  grade: "B",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5GrDrzY4yWfB2YwyZqx2gP",
      externalLink: "https://open.spotify.com/album/5GrDrzY4yWfB2YwyZqx2gP",
    },
  ],
  title: "Don't Know About The World",
} as const satisfies Release
