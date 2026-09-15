import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const billyJoelTheNylonCurtain = {
  id: "01a0676a-d72d-7049-80fa-91270dc29721",
  type: "page-type/release",
  slug: "billy-joel-the-nylon-curtain",
  title: "The Nylon Curtain",
  partOfCollections: ["artist/billy-joel"],
  position: 0,
  ownLength: 41.49285,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "1982-06-23",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "50bajZpetfL5T0iRCOR74J",
      externalLink: "https://open.spotify.com/album/50bajZpetfL5T0iRCOR74J",
    },
  ],
} as const satisfies Release
