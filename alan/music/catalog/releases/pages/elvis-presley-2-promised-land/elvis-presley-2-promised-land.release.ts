import type { Release } from "akasha/alan/music/catalog/releases/release.page-type.types.ts"

export const elvisPresley2PromisedLand = {
  id: "01a0676a-d727-7027-8347-26106790b85f",
  type: "release",
  slug: "elvis-presley-2-promised-land",
  title: "Promised Land",
  partOfCollections: ["elvis-presley"],
  position: 0,
  ownLength: 28.44415,
  ownProgress: 28.44415,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "1975-01-08",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "47pECKZZzoUQ2aug4zJLGv",
      externalLink: "https://open.spotify.com/album/47pECKZZzoUQ2aug4zJLGv",
    },
  ],
} as const satisfies Release
