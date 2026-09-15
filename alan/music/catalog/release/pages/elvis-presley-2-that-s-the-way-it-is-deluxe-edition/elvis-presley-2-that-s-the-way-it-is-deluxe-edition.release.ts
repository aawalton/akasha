import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const elvisPresley2ThatSTheWayItIsDeluxeEdition = {
  id: "01a0676a-d72c-701d-9458-6e817f073f1a",
  type: "page-type/release",
  slug: "elvis-presley-2-that-s-the-way-it-is-deluxe-edition",
  title: "That's the Way It Is (Deluxe Edition)",
  partOfCollections: ["artist/elvis-presley"],
  position: 0,
  ownLength: 534.034383,
  ownProgress: 534.034383,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "1970-11-11",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2J7LSpd6suKj8qd9MkjuGK",
      externalLink: "https://open.spotify.com/album/2J7LSpd6suKj8qd9MkjuGK",
    },
  ],
} as const satisfies Release
