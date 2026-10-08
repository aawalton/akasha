import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const arianaGrandeProblem = {
  id: "01a0676a-d727-7025-81da-75aecfec443c",
  type: "page-type/release",
  slug: "ariana-grande-problem",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/ariana-grande"],
  position: 0,
  publishedAt: "2014-04-28",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6YaOfJYBAlkWqI5Gfsgttp",
      externalLink: "https://open.spotify.com/album/6YaOfJYBAlkWqI5Gfsgttp",
      lastSyncedAt: "2025-10-02",
    },
  ],
  title: "Problem",
  createdAt: "2026-09-03T13:17:30.279Z",
  updatedAt: "2026-09-21T16:45:29.000Z",
} as const satisfies Release
