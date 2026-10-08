import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const paulCardallChristmasDreaming = {
  id: "01a0676a-d71a-7037-b926-4635b95748d3",
  type: "page-type/release",
  slug: "paul-cardall-christmas-dreaming",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/paul-cardall"],
  position: 0,
  publishedAt: "2023-12-01",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2AYRJwJrnyCB7gyJZOSZeZ",
      externalLink: "https://open.spotify.com/album/2AYRJwJrnyCB7gyJZOSZeZ",
    },
  ],
  title: "Christmas Dreaming",
  createdAt: "2026-09-03T13:17:30.266Z",
  updatedAt: "2026-09-21T16:45:29.000Z",
} as const satisfies Release
