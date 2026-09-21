import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const jessicaBaioWorldRecord = {
  id: "01a0676a-d731-7038-b2fb-a3e32166d11d",
  type: "page-type/release",
  slug: "jessica-baio-world-record",
  grade: "B",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/jessica-baio"],
  position: 0,
  publishedAt: "2020-01-02",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4P06tSM3MyV34N3Bkmy3M3",
      externalLink: "https://open.spotify.com/album/4P06tSM3MyV34N3Bkmy3M3",
    },
  ],
  title: "world record",
} as const satisfies Release
