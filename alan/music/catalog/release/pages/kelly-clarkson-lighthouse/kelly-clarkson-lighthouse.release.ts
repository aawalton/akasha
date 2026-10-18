import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const kellyClarksonLighthouse = {
  id: "01a0676a-d723-7030-8029-73ddb3384dca",
  type: "page-type/release",
  slug: "kelly-clarkson-lighthouse",
  title: "lighthouse",
  partOfCollections: ["artist/kelly-clarkson"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2024-01-12",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4DzAjjwEIpOvWQPVrI9lva",
      externalLink: "https://open.spotify.com/album/4DzAjjwEIpOvWQPVrI9lva",
      lastSyncedAt: "2026-02-13",
    },
  ],
  createdAt: "2026-09-03T13:17:30.275Z",
  updatedAt: "2026-10-18T14:00:36.173Z",
} as const satisfies Release
