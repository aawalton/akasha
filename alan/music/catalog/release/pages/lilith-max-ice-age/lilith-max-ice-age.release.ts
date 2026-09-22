import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const lilithMaxIceAge = {
  id: "01a0676a-d721-704c-a74a-bd11f88ef6a1",
  type: "page-type/release",
  slug: "lilith-max-ice-age",
  grade: "C",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/lilith-max"],
  position: 0,
  publishedAt: "2022-02-11",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "344KqSvf67AwF4KbF4ckNc",
      externalLink: "https://open.spotify.com/album/344KqSvf67AwF4KbF4ckNc",
    },
  ],
  title: "Ice Age",
} as const satisfies Release
