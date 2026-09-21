import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const arianaGrandeTheBoyIsMine = {
  id: "01a0676a-d72c-7035-8ddf-23e2cf11039a",
  type: "page-type/release",
  slug: "ariana-grande-the-boy-is-mine",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/ariana-grande"],
  position: 0,
  publishedAt: "2024-07-19",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6QfFpCdG9XXQQ9pPJQtxz7",
      externalLink: "https://open.spotify.com/album/6QfFpCdG9XXQQ9pPJQtxz7",
      lastSyncedAt: "2025-10-02",
    },
  ],
  title: "the boy is mine",
} as const satisfies Release
