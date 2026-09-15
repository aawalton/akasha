import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const kellyClarksonHeatLukeSolomonRemix = {
  id: "01a0676a-d720-7015-90a9-4c8280862f9f",
  type: "page-type/release",
  slug: "kelly-clarkson-heat-luke-solomon-remix",
  title: "Heat (Luke Solomon Remix)",
  partOfCollections: ["artist/kelly-clarkson"],
  position: 0,
  ownLength: 10.8913,
  ownProgress: 10.8913,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2018-07-27",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5yNbvb6bwjiTwRWlAG0gdc",
      externalLink: "https://open.spotify.com/album/5yNbvb6bwjiTwRWlAG0gdc",
      lastSyncedAt: "2026-02-13",
    },
  ],
} as const satisfies Release
