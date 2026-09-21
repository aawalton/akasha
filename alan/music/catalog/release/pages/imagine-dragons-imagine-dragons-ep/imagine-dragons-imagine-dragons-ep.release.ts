import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const imagineDragonsImagineDragonsEp = {
  id: "01a0676a-d721-7058-a324-996dbfbea9a1",
  type: "page-type/release",
  slug: "imagine-dragons-imagine-dragons-ep",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/imagine-dragons"],
  position: 0,
  publishedAt: "2009-02-01",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0cmKGBTMZndKAu5DW9mPUJ",
      externalLink: "https://open.spotify.com/album/0cmKGBTMZndKAu5DW9mPUJ",
    },
  ],
  title: "Imagine Dragons EP",
} as const satisfies Release
