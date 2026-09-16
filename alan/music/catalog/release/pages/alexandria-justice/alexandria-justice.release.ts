import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const alexandriaJustice = {
  id: "01a0aa7a-83a7-7e32-a11e-25fc19ef9472",
  type: "page-type/release",
  slug: "alexandria-justice",
  ownLength: 3.2228833333333333,
  ownProgress: 0,
  partOfCollections: ["artist/alexandria"],
  position: 0,
  publishedAt: "2026-06-12",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7An156t7WzbiEVJG5xBa2Q",
      externalLink: "https://open.spotify.com/album/7An156t7WzbiEVJG5xBa2Q",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Justice",
} as const satisfies Release
