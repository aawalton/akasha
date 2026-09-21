import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const arianaGrandeSweetener = {
  id: "01a0676a-d72b-7003-bbc8-4f5fc2c14dd5",
  type: "page-type/release",
  slug: "ariana-grande-sweetener",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/ariana-grande"],
  position: 0,
  publishedAt: "2018-08-17",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3tx8gQqWbGwqIGZHqDNrGe",
      externalLink: "https://open.spotify.com/album/3tx8gQqWbGwqIGZHqDNrGe",
      lastSyncedAt: "2025-10-02",
    },
  ],
  title: "Sweetener",
} as const satisfies Release
