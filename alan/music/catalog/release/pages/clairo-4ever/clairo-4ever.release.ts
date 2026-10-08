import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const clairo4ever = {
  id: "01a0676a-d715-700d-911c-adf80b6100f4",
  type: "page-type/release",
  slug: "clairo-4ever",
  title: "4EVER",
  partOfCollections: ["artist/clairo"],
  position: 0,
  ownLength: 2.659917,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2018-04-27",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4xnTJLqtZcXaj1QHO0GMjt",
      externalLink: "https://open.spotify.com/album/4xnTJLqtZcXaj1QHO0GMjt",
    },
  ],
  createdAt: "2026-09-03T13:17:30.261Z",
  updatedAt: "2026-09-15T16:34:44.000Z",
} as const satisfies Release
