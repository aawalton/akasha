import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const enyaMayItBe = {
  id: "01a0676a-d724-703d-916f-09dd3954c07a",
  type: "page-type/release",
  slug: "enya-may-it-be",
  title: "May It Be",
  partOfCollections: ["artist/enya"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2002-01-01",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6o6RblnNPtSpuIdv5p2cZe",
      externalLink: "https://open.spotify.com/album/6o6RblnNPtSpuIdv5p2cZe",
    },
  ],
  createdAt: "2026-09-03T13:17:30.276Z",
  updatedAt: "2026-10-17T14:01:01.286Z",
} as const satisfies Release
