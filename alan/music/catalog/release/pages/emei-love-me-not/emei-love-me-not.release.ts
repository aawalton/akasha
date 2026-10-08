import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const emeiLoveMeNot = {
  id: "01a0676a-d723-7075-aef9-0aef5eee6f81",
  type: "page-type/release",
  slug: "emei-love-me-not",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/emei"],
  position: 0,
  publishedAt: "2024-02-09",
  grade: "B",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7xUn31DxHbMMH8oNTeI4uh",
      externalLink: "https://open.spotify.com/album/7xUn31DxHbMMH8oNTeI4uh",
    },
  ],
  title: "Love Me Not",
  createdAt: "2026-09-03T13:17:30.275Z",
  updatedAt: "2026-09-21T19:44:25.000Z",
} as const satisfies Release
