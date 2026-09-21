import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const arianaGrandeTheBoyIsMineRemix = {
  id: "01a0676a-d72c-7036-b296-875c63db6fd0",
  type: "page-type/release",
  slug: "ariana-grande-the-boy-is-mine-remix",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/ariana-grande"],
  position: 0,
  publishedAt: "2024-06-21",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3AICoyb5EH2OBmQJnaPDIt",
      externalLink: "https://open.spotify.com/album/3AICoyb5EH2OBmQJnaPDIt",
      lastSyncedAt: "2025-10-02",
    },
  ],
  title: "the boy is mine (Remix)",
} as const satisfies Release
