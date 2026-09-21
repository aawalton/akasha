import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const vinnyMarchiConceptsOfAMan = {
  id: "01a0676a-d71b-7021-8318-8582b86ca441",
  type: "page-type/release",
  slug: "vinny-marchi-concepts-of-a-man",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/vinny-marchi"],
  position: 0,
  publishedAt: "2024-11-08",
  grade: "C",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0EyTncRYT0KMqnOWYEDtKA",
      externalLink: "https://open.spotify.com/album/0EyTncRYT0KMqnOWYEDtKA",
      lastSyncedAt: "2025-10-24",
    },
  ],
  title: "Concepts of a Man",
} as const satisfies Release
