import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const emBeiholdPainfulTruth = {
  id: "01a0676a-d726-7058-a970-e5a2986b0e34",
  type: "page-type/release",
  slug: "em-beihold-painful-truth",
  grade: "B",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/em-beihold"],
  position: 0,
  publishedAt: "2020-11-20",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6g0XxfttXZjI3U84pj2mBe",
      externalLink: "https://open.spotify.com/album/6g0XxfttXZjI3U84pj2mBe",
    },
  ],
  title: "Painful Truth",
} as const satisfies Release
