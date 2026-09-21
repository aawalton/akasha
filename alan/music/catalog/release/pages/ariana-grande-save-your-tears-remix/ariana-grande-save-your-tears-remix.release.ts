import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const arianaGrandeSaveYourTearsRemix = {
  id: "01a0676a-d728-7044-816d-bf91b0d58e2d",
  type: "page-type/release",
  slug: "ariana-grande-save-your-tears-remix",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/ariana-grande"],
  position: 0,
  publishedAt: "2021-04-23",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2fyOpT5c9kxR8zbDh6UtXh",
      externalLink: "https://open.spotify.com/album/2fyOpT5c9kxR8zbDh6UtXh",
      lastSyncedAt: "2025-10-02",
    },
  ],
  title: "Save Your Tears (Remix)",
} as const satisfies Release
