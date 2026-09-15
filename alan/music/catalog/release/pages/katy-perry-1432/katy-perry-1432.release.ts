import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const katyPerry1432 = {
  id: "01a0676a-d714-7014-8414-970aa8d7b693",
  type: "page-type/release",
  slug: "katy-perry-1432",
  title: "1432",
  partOfCollections: ["artist/katy-perry"],
  position: 0,
  ownLength: 44.930917,
  ownProgress: 44.930917,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2024-12-20",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5Xd0KCzb0EJtPbUEiyxYVH",
      externalLink: "https://open.spotify.com/album/5Xd0KCzb0EJtPbUEiyxYVH",
    },
  ],
} as const satisfies Release
