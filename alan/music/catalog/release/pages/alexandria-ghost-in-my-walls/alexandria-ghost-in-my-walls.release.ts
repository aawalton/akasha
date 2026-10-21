import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const alexandriaGhostInMyWalls = {
  id: "01a15eb5-7a4f-70dc-82f4-b45898fe6a4e",
  type: "page-type/release",
  slug: "alexandria-ghost-in-my-walls",
  ownLength: 2.3167333333333335,
  ownProgress: 0,
  partOfCollections: ["artist/alexandria"],
  position: 0,
  publishedAt: "2026-10-16",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3DWIwr5wEOcXka8B0z4dew",
      externalLink: "https://open.spotify.com/album/3DWIwr5wEOcXka8B0z4dew",
      lastSyncedAt: "2026-10-21",
    },
  ],
  title: "Ghost in My Walls",
  createdAt: "2026-10-21T13:45:14.062Z",
  updatedAt: "2026-10-21T13:45:14.062Z",
} as const satisfies Release
