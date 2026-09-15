import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const jessicaBaioWorldRecord = {
  id: "01a0676a-d731-7038-b2fb-a3e32166d11d",
  type: "page-type/release",
  slug: "jessica-baio-world-record",
  title: "world record",
  partOfCollections: ["artist/jessica-baio"],
  position: 0,
  ownLength: 3.0238,
  ownProgress: 3.0238,
  unit: "unit/minutes",
  status: "completed",
  rank: "B",
  publishedAt: "2020-01-02",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4P06tSM3MyV34N3Bkmy3M3",
      externalLink: "https://open.spotify.com/album/4P06tSM3MyV34N3Bkmy3M3",
    },
  ],
} as const satisfies Release
