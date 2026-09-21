import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const auroraRunawayLvl2 = {
  id: "01a0676a-d728-702d-aa5c-24941b5d6a7d",
  type: "page-type/release",
  slug: "aurora-runaway-lvl-2",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/aurora"],
  position: 0,
  publishedAt: "2021-05-07",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4MQrJZY0R1IAO4YhH7CzRZ",
      externalLink: "https://open.spotify.com/album/4MQrJZY0R1IAO4YhH7CzRZ",
    },
  ],
  title: "Runaway (Lvl.2)",
} as const satisfies Release
