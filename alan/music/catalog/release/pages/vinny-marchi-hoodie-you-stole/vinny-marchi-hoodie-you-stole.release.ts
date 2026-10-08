import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const vinnyMarchiHoodieYouStole = {
  id: "01a0676a-d720-705b-978a-d5734eb72b82",
  type: "page-type/release",
  slug: "vinny-marchi-hoodie-you-stole",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/vinny-marchi"],
  position: 0,
  publishedAt: "2022-11-11",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2HoVKgGvezXdY7foswVjgG",
      externalLink: "https://open.spotify.com/album/2HoVKgGvezXdY7foswVjgG",
      lastSyncedAt: "2025-10-24",
    },
  ],
  title: "Hoodie You Stole",
  createdAt: "2026-09-03T13:17:30.272Z",
  updatedAt: "2026-09-21T16:45:29.000Z",
} as const satisfies Release
