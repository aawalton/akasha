import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const kDaTheBaddest = {
  id: "01a0676a-d72c-7027-b6b0-4404e5c88664",
  type: "page-type/release",
  slug: "k-da-the-baddest",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/k-da"],
  position: 0,
  publishedAt: "2020-08-27",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3qo3MiVHiorkDRbuhjKK5d",
      externalLink: "https://open.spotify.com/album/3qo3MiVHiorkDRbuhjKK5d",
    },
  ],
  title: "THE BADDEST",
} as const satisfies Release
