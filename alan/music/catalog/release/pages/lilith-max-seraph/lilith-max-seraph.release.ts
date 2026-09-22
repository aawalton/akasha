import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const lilithMaxSeraph = {
  id: "01a0676a-d728-7062-91d1-20cc16856160",
  type: "page-type/release",
  slug: "lilith-max-seraph",
  grade: "B",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/lilith-max"],
  position: 0,
  publishedAt: "2025-02-21",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5GFkYfiLMu1nInWDh0AtQY",
      externalLink: "https://open.spotify.com/album/5GFkYfiLMu1nInWDh0AtQY",
    },
  ],
  title: "Seraph",
} as const satisfies Release
