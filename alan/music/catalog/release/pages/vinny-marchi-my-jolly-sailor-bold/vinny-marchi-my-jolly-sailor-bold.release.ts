import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const vinnyMarchiMyJollySailorBold = {
  id: "01a0676a-d725-702c-af0a-25953adbb1f0",
  type: "page-type/release",
  slug: "vinny-marchi-my-jolly-sailor-bold",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/vinny-marchi"],
  position: 0,
  publishedAt: "2022-05-19",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3SlDy6kC80wJqJeIJFT13l",
      externalLink: "https://open.spotify.com/album/3SlDy6kC80wJqJeIJFT13l",
      lastSyncedAt: "2025-10-24",
    },
  ],
  title: "My Jolly Sailor Bold",
} as const satisfies Release
