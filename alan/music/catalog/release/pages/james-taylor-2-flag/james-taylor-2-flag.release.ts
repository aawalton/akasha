import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const jamesTaylor2Flag = {
  id: "01a0676a-d71e-700a-862e-2fe1a9c9d79f",
  type: "page-type/release",
  slug: "james-taylor-2-flag",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/james-taylor"],
  position: 0,
  publishedAt: "1979-01-01",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1gFeUg5zdqdHTq48VA7PVJ",
      externalLink: "https://open.spotify.com/album/1gFeUg5zdqdHTq48VA7PVJ",
    },
  ],
  title: "Flag",
  createdAt: "2026-09-03T13:17:30.270Z",
  updatedAt: "2026-09-21T16:45:29.000Z",
} as const satisfies Release
