import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const sabrinaCarpenterFirstLoveRemixes = {
  id: "01a0676a-d71e-7004-a4d3-9312fa3b645f",
  type: "page-type/release",
  slug: "sabrina-carpenter-first-love-remixes",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/sabrina-carpenter"],
  position: 0,
  publishedAt: "2017-12-01",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0PRCtct3H4TvrHdVBhKKxc",
      externalLink: "https://open.spotify.com/album/0PRCtct3H4TvrHdVBhKKxc",
      lastSyncedAt: "2025-12-24",
    },
  ],
  title: "First Love (Remixes)",
} as const satisfies Release
