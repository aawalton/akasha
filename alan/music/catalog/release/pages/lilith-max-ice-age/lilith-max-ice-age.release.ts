import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const lilithMaxIceAge = {
  id: "01a0676a-d721-704c-a74a-bd11f88ef6a1",
  type: "page-type/release",
  slug: "lilith-max-ice-age",
  title: "Ice Age",
  partOfCollections: ["artist/lilith-max"],
  position: 0,
  ownLength: 3.141183,
  ownProgress: 3.141183,
  unit: "unit/minutes",
  status: "completed",
  rank: "C",
  publishedAt: "2022-02-11",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "344KqSvf67AwF4KbF4ckNc",
      externalLink: "https://open.spotify.com/album/344KqSvf67AwF4KbF4ckNc",
    },
  ],
} as const satisfies Release
