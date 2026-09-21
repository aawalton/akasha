import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const zaraLarssonAmmunitionDennisRemix = {
  id: "01a0676a-d717-700d-a4e1-3094aacc255e",
  type: "page-type/release",
  slug: "zara-larsson-ammunition-dennis-remix",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/zara-larsson"],
  position: 0,
  publishedAt: "2024-09-13",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3aIqR3VX1QMeQzrWgmalVp",
      externalLink: "https://open.spotify.com/album/3aIqR3VX1QMeQzrWgmalVp",
      lastSyncedAt: "2025-12-20",
    },
  ],
  title: "Ammunition (DENNIS Remix)",
} as const satisfies Release
