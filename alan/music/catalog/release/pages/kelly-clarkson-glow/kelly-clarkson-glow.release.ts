import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const kellyClarksonGlow = {
  id: "01a0676a-d71f-7008-bcdf-e421ccb4af83",
  type: "page-type/release",
  slug: "kelly-clarkson-glow",
  title: "Glow",
  partOfCollections: ["artist/kelly-clarkson"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2021-10-14",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1gGakSDaIqMO3AvJyNPxBX",
      externalLink: "https://open.spotify.com/album/1gGakSDaIqMO3AvJyNPxBX",
      lastSyncedAt: "2026-02-13",
    },
  ],
  createdAt: "2026-09-03T13:17:30.271Z",
  updatedAt: "2026-10-18T14:00:36.173Z",
} as const satisfies Release
