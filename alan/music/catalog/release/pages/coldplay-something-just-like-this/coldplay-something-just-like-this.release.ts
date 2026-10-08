import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const coldplaySomethingJustLikeThis = {
  id: "01a0676a-d729-705b-86d9-a0e187e4eed5",
  type: "page-type/release",
  slug: "coldplay-something-just-like-this",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/coldplay"],
  position: 0,
  publishedAt: "2017-02-22",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7IzpJkWQqgz1BTutQvSitX",
      externalLink: "https://open.spotify.com/album/7IzpJkWQqgz1BTutQvSitX",
    },
  ],
  title: "Something Just Like This",
  createdAt: "2026-09-03T13:17:30.281Z",
  updatedAt: "2026-09-21T16:45:29.000Z",
} as const satisfies Release
