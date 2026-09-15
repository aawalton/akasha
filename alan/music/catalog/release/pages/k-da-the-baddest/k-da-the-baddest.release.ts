import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const kDaTheBaddest = {
  id: "01a0676a-d72c-7027-b6b0-4404e5c88664",
  type: "page-type/release",
  slug: "k-da-the-baddest",
  title: "THE BADDEST",
  partOfCollections: ["artist/k-da"],
  position: 0,
  ownLength: 2.71,
  ownProgress: 2.71,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2020-08-27",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3qo3MiVHiorkDRbuhjKK5d",
      externalLink: "https://open.spotify.com/album/3qo3MiVHiorkDRbuhjKK5d",
    },
  ],
} as const satisfies Release
