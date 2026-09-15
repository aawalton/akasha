import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const paulCardallChristmasHymns = {
  id: "01a0676a-d71a-7039-adf4-1c3a628804c4",
  type: "page-type/release",
  slug: "paul-cardall-christmas-hymns",
  title: "Christmas Hymns",
  partOfCollections: ["artist/paul-cardall"],
  position: 0,
  ownLength: 44.88955,
  ownProgress: 44.88955,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2005-09-14",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2QnRHd30duEv4dMAil8WPH",
      externalLink: "https://open.spotify.com/album/2QnRHd30duEv4dMAil8WPH",
    },
  ],
} as const satisfies Release
