import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const vinnyMarchiComeLittleChildren = {
  id: "01a0676a-d71b-7018-8757-5eb37e3771c1",
  type: "page-type/release",
  slug: "vinny-marchi-come-little-children",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/vinny-marchi"],
  position: 0,
  publishedAt: "2022-09-18",
  rank: "C",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0wBnUeyPiCNNKRUg5MTtWb",
      externalLink: "https://open.spotify.com/album/0wBnUeyPiCNNKRUg5MTtWb",
      lastSyncedAt: "2025-10-24",
    },
  ],
  title: "Come Little Children",
} as const satisfies Release
