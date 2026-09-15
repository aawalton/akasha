import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const linkinParkMeteora20thAnniversaryEdition = {
  id: "01a0676a-d724-7056-942b-2c5bcc5aaba9",
  type: "page-type/release",
  slug: "linkin-park-meteora-20th-anniversary-edition",
  title: "Meteora 20th Anniversary Edition",
  partOfCollections: ["artist/linkin-park"],
  position: 0,
  ownLength: 301.08035,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2023-04-07",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3Q9wXhEAX7NYCPP0hxIuDz",
      externalLink: "https://open.spotify.com/album/3Q9wXhEAX7NYCPP0hxIuDz",
    },
  ],
} as const satisfies Release
