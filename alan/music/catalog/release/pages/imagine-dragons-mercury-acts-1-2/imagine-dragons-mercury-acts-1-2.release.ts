import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const imagineDragonsMercuryActs12 = {
  id: "01a0676a-d724-704d-83c4-0c60085cf037",
  type: "page-type/release",
  slug: "imagine-dragons-mercury-acts-1-2",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/imagine-dragons"],
  position: 0,
  publishedAt: "2022-07-01",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6yiXkzHvC0OTmhfDQOEWtS",
      externalLink: "https://open.spotify.com/album/6yiXkzHvC0OTmhfDQOEWtS",
    },
  ],
  title: "Mercury - Acts 1 & 2",
} as const satisfies Release
