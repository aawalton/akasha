import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const arianaGrandeIntoYouAlexGheneaRemix = {
  id: "01a0676a-d721-707c-9454-ea1db962075a",
  type: "page-type/release",
  slug: "ariana-grande-into-you-alex-ghenea-remix",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/ariana-grande"],
  position: 0,
  publishedAt: "2016-08-19",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6ec1HRowDGniTh3LVi6N8N",
      externalLink: "https://open.spotify.com/album/6ec1HRowDGniTh3LVi6N8N",
      lastSyncedAt: "2025-10-02",
    },
  ],
  title: "Into You (Alex Ghenea Remix)",
} as const satisfies Release
