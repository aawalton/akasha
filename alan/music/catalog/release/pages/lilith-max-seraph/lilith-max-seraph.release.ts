import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const lilithMaxSeraph = {
  id: "01a0676a-d728-7062-91d1-20cc16856160",
  type: "page-type/release",
  slug: "lilith-max-seraph",
  title: "Seraph",
  partOfCollections: ["artist/lilith-max"],
  position: 0,
  ownLength: 6.505333,
  ownProgress: 6.505333,
  unit: "unit/minutes",
  status: "completed",
  grade: "B",
  publishedAt: "2025-02-21",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5GFkYfiLMu1nInWDh0AtQY",
      externalLink: "https://open.spotify.com/album/5GFkYfiLMu1nInWDh0AtQY",
    },
  ],
} as const satisfies Release
