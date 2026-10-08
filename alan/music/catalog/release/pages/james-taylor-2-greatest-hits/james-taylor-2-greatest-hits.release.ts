import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const jamesTaylor2GreatestHits = {
  id: "01a0676a-d71f-702b-98ad-203a82cb9910",
  type: "page-type/release",
  slug: "james-taylor-2-greatest-hits",
  title: "Greatest Hits",
  partOfCollections: ["artist/james-taylor"],
  position: 0,
  ownLength: 41.45535,
  ownProgress: 41.45535,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "1976-01-01",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2L4U4JjEADYaVltkvDrkCC",
      externalLink: "https://open.spotify.com/album/2L4U4JjEADYaVltkvDrkCC",
    },
  ],
  createdAt: "2026-09-03T13:17:30.271Z",
  updatedAt: "2026-09-15T16:36:36.000Z",
} as const satisfies Release
