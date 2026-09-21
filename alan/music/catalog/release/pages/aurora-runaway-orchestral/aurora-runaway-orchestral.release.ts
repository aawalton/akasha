import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const auroraRunawayOrchestral = {
  id: "01a0676a-d728-702e-82fe-d6d0abfc3cdb",
  type: "page-type/release",
  slug: "aurora-runaway-orchestral",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/aurora"],
  position: 0,
  publishedAt: "2025-02-27",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "42kpZzNwOI177DpbDyTwP7",
      externalLink: "https://open.spotify.com/album/42kpZzNwOI177DpbDyTwP7",
    },
  ],
  title: "Runaway (Orchestral)",
} as const satisfies Release
