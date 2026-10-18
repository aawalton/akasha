import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const kellyClarksonHeat = {
  id: "01a0676a-d720-7011-85fc-22b470e99872",
  type: "page-type/release",
  slug: "kelly-clarkson-heat",
  title: "Heat",
  partOfCollections: ["artist/kelly-clarkson"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2018-12-07",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3ldfffdVymqylDoMmnGWjJ",
      externalLink: "https://open.spotify.com/album/3ldfffdVymqylDoMmnGWjJ",
      lastSyncedAt: "2026-02-13",
    },
  ],
  createdAt: "2026-09-03T13:17:30.272Z",
  updatedAt: "2026-10-18T14:00:36.173Z",
} as const satisfies Release
