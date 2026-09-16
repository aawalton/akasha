import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const alexandriaKnightOfSwords = {
  id: "01a0aa7a-8358-7e46-95ad-294b3d64fdb1",
  type: "page-type/release",
  slug: "alexandria-knight-of-swords",
  ownLength: 2.652616666666667,
  ownProgress: 0,
  partOfCollections: ["artist/alexandria"],
  position: 0,
  publishedAt: "2026-07-31",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1QspQHGZ9yJhibMqUshuA0",
      externalLink: "https://open.spotify.com/album/1QspQHGZ9yJhibMqUshuA0",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Knight of Swords",
} as const satisfies Release
