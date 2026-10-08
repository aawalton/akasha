import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const arianaGrandeMetHimLastNight = {
  id: "01a0676a-d724-7052-8942-181bd5ede1c2",
  type: "page-type/release",
  slug: "ariana-grande-met-him-last-night",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/ariana-grande"],
  position: 0,
  publishedAt: "2021-04-01",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3UIdh1xeV6hqlfhmimFkWx",
      externalLink: "https://open.spotify.com/album/3UIdh1xeV6hqlfhmimFkWx",
      lastSyncedAt: "2025-10-02",
    },
  ],
  title: "Met Him Last Night",
  createdAt: "2026-09-03T13:17:30.276Z",
  updatedAt: "2026-09-21T16:45:29.000Z",
} as const satisfies Release
