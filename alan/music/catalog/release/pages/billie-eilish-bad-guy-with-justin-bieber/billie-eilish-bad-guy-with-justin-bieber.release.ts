import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const billieEilishBadGuyWithJustinBieber = {
  id: "01a0676a-d718-7008-9c69-ff3e94f91518",
  type: "page-type/release",
  slug: "billie-eilish-bad-guy-with-justin-bieber",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/billie-eilish"],
  position: 0,
  publishedAt: "2019-07-11",
  rank: "B",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6lMlX68jJrx67hiCqdiDvW",
      externalLink: "https://open.spotify.com/album/6lMlX68jJrx67hiCqdiDvW",
    },
  ],
  title: "bad guy (with Justin Bieber)",
} as const satisfies Release
