import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const alexandriaLust = {
  id: "01a0676a-d724-701d-8136-dd7ec11ba1b2",
  type: "page-type/release",
  slug: "alexandria-lust",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/alexandria"],
  position: 0,
  publishedAt: "2025-10-14",
  rank: "B",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5nQalzcY5OAeEjf2AfpOu0",
      externalLink: "https://open.spotify.com/album/5nQalzcY5OAeEjf2AfpOu0",
      lastSyncedAt: "2025-10-18",
    },
  ],
  title: "Lust",
} as const satisfies Release
