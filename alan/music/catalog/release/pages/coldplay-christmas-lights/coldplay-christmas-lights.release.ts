import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const coldplayChristmasLights = {
  id: "01a0676a-d71a-703e-9338-efc6ba6ee4f9",
  type: "page-type/release",
  slug: "coldplay-christmas-lights",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/coldplay"],
  position: 0,
  publishedAt: "2010-12-01",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "06CvxUVwS8h2aJYcCtApgy",
      externalLink: "https://open.spotify.com/album/06CvxUVwS8h2aJYcCtApgy",
    },
  ],
  title: "Christmas Lights",
} as const satisfies Release
