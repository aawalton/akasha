import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const pentatonixPentatonixDeluxeVersion = {
  id: "01a0676a-d726-706b-81d3-ab409672bbd3",
  type: "page-type/release",
  slug: "pentatonix-pentatonix-deluxe-version",
  title: "Pentatonix (Deluxe Version)",
  partOfCollections: ["artist/pentatonix"],
  position: 0,
  ownLength: 54.077,
  ownProgress: 54.077,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2015-10-16",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6qf9tE8pNRW0kX1Cucrixr",
      externalLink: "https://open.spotify.com/album/6qf9tE8pNRW0kX1Cucrixr",
    },
  ],
  createdAt: "2026-09-03T13:17:30.278Z",
  updatedAt: "2026-09-15T16:38:50.000Z",
} as const satisfies Release
