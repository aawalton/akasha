import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const imagineDragonsIWasMe = {
  id: "01a0676a-d721-7046-8f82-b310e4cc5e45",
  type: "page-type/release",
  slug: "imagine-dragons-i-was-me",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/imagine-dragons"],
  position: 0,
  publishedAt: "2015-10-12",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2PQ7s9ggz5gUrrM9k2KPOu",
      externalLink: "https://open.spotify.com/album/2PQ7s9ggz5gUrrM9k2KPOu",
    },
  ],
  title: "I Was Me",
} as const satisfies Release
