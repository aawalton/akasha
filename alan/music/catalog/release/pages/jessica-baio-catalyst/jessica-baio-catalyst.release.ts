import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const jessicaBaioCatalyst = {
  id: "01a0676a-d71a-7005-bdf9-e2fe09d16264",
  type: "page-type/release",
  slug: "jessica-baio-catalyst",
  grade: "B",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/jessica-baio"],
  position: 0,
  publishedAt: "2023-03-10",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4aAXY4RkUpFYjzMbiwuWpo",
      externalLink: "https://open.spotify.com/album/4aAXY4RkUpFYjzMbiwuWpo",
    },
  ],
  title: "catalyst",
} as const satisfies Release
