import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const imagineDragonsBirds = {
  id: "01a0676a-d719-700a-a2cc-2d6287ab0c78",
  type: "page-type/release",
  slug: "imagine-dragons-birds",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/imagine-dragons"],
  position: 0,
  publishedAt: "2019-06-20",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0OXJFBFvYP5b2U0qWUQehJ",
      externalLink: "https://open.spotify.com/album/0OXJFBFvYP5b2U0qWUQehJ",
    },
  ],
  title: "Birds",
  createdAt: "2026-09-03T13:17:30.265Z",
  updatedAt: "2026-09-21T16:45:29.000Z",
} as const satisfies Release
