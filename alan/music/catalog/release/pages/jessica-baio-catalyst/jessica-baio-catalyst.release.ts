import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const jessicaBaioCatalyst = {
  id: "01a0676a-d71a-7005-bdf9-e2fe09d16264",
  type: "release",
  slug: "jessica-baio-catalyst",
  title: "catalyst",
  partOfCollections: ["artist/jessica-baio"],
  position: 0,
  ownLength: 17.88575,
  ownProgress: 17.88575,
  unit: "unit/minutes",
  status: "completed",
  rank: "B",
  publishedAt: "2023-03-10",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4aAXY4RkUpFYjzMbiwuWpo",
      externalLink: "https://open.spotify.com/album/4aAXY4RkUpFYjzMbiwuWpo",
    },
  ],
} as const satisfies Release
