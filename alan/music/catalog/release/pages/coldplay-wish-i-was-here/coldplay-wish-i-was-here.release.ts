import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const coldplayWishIWasHere = {
  id: "01a0676a-d731-7029-8f0e-fb80905f94b0",
  type: "page-type/release",
  slug: "coldplay-wish-i-was-here",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/coldplay"],
  position: 0,
  publishedAt: "2014-07-11",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3ehc0OQ4fmdsVLhQp5SBTE",
      externalLink: "https://open.spotify.com/album/3ehc0OQ4fmdsVLhQp5SBTE",
    },
  ],
  title: "Wish I Was Here",
} as const satisfies Release
