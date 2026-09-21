import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const paulCardallChristmasHymns = {
  id: "01a0676a-d71a-7039-adf4-1c3a628804c4",
  type: "page-type/release",
  slug: "paul-cardall-christmas-hymns",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/paul-cardall"],
  position: 0,
  publishedAt: "2005-09-14",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2QnRHd30duEv4dMAil8WPH",
      externalLink: "https://open.spotify.com/album/2QnRHd30duEv4dMAil8WPH",
    },
  ],
  title: "Christmas Hymns",
} as const satisfies Release
