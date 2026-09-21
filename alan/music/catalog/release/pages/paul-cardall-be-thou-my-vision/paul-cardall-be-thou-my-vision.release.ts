import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const paulCardallBeThouMyVision = {
  id: "01a0676a-d718-7023-aa28-3c597cb4d04e",
  type: "page-type/release",
  slug: "paul-cardall-be-thou-my-vision",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/paul-cardall"],
  position: 0,
  publishedAt: "2024-04-26",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1zpeBbqlIIsyYxbMDcjvB2",
      externalLink: "https://open.spotify.com/album/1zpeBbqlIIsyYxbMDcjvB2",
    },
  ],
  title: "Be Thou My Vision",
} as const satisfies Release
