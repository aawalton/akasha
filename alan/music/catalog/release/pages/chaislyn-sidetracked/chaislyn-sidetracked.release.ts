import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const chaislynSidetracked = {
  id: "01a0676a-d729-7004-9a92-0a2bcf4a30b0",
  type: "page-type/release",
  slug: "chaislyn-sidetracked",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/chaislyn"],
  position: 0,
  publishedAt: "2023-08-11",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0U59gfuWk7sG0IGRV5vOws",
      externalLink: "https://open.spotify.com/album/0U59gfuWk7sG0IGRV5vOws",
    },
  ],
  title: "Sidetracked",
} as const satisfies Release
