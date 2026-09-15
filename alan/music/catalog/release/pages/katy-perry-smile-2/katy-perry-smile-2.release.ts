import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const katyPerrySmile2 = {
  id: "01a0676a-d729-702c-9dba-fc815675a4d2",
  type: "release",
  slug: "katy-perry-smile-2",
  title: "Smile",
  partOfCollections: ["artist/katy-perry"],
  position: 0,
  ownLength: 36.70775,
  ownProgress: 36.70775,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2020-08-28",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "47zMF6LrXQ8odi6Xv1unC0",
      externalLink: "https://open.spotify.com/album/47zMF6LrXQ8odi6Xv1unC0",
    },
  ],
} as const satisfies Release
