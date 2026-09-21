import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const jessicaBaioHeLovesMeHeLovesMeNotStripped = {
  id: "01a0676a-d720-7005-a728-eaa8b2201732",
  type: "page-type/release",
  slug: "jessica-baio-he-loves-me-he-loves-me-not-stripped",
  grade: "B",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/jessica-baio"],
  position: 0,
  publishedAt: "2024-02-14",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1u2OZ8Aqv4gNcot9JeuDBF",
      externalLink: "https://open.spotify.com/album/1u2OZ8Aqv4gNcot9JeuDBF",
    },
  ],
  title: "he loves me, he loves me not (stripped)",
} as const satisfies Release
