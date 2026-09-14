import type { Release } from "akasha/alan/music/catalog/releases/release.page-type.types.ts"

export const coldplaySomethingJustLikeThis = {
  id: "01a0676a-d729-705b-86d9-a0e187e4eed5",
  type: "release",
  slug: "coldplay-something-just-like-this",
  title: "Something Just Like This",
  partOfCollections: ["artist/coldplay"],
  position: 0,
  ownLength: 4.1271,
  ownProgress: 4.1271,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2017-02-22",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7IzpJkWQqgz1BTutQvSitX",
      externalLink: "https://open.spotify.com/album/7IzpJkWQqgz1BTutQvSitX",
    },
  ],
} as const satisfies Release
