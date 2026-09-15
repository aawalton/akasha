import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const kellyClarksonMeaningOfLife = {
  id: "01a0676a-d724-7046-a57e-31b57f508e3e",
  type: "page-type/release",
  slug: "kelly-clarkson-meaning-of-life",
  title: "Meaning of Life",
  partOfCollections: ["artist/kelly-clarkson"],
  position: 0,
  ownLength: 44.220817,
  ownProgress: 44.220817,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2017-10-27",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6GBu7GU6dztLYlZuUHiwA2",
      externalLink: "https://open.spotify.com/album/6GBu7GU6dztLYlZuUHiwA2",
      lastSyncedAt: "2026-02-13",
    },
  ],
} as const satisfies Release
