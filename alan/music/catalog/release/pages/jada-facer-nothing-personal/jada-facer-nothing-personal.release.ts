import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const jadaFacerNothingPersonal = {
  id: "01a0676a-d726-7000-9ed6-10758c63d8e2",
  type: "page-type/release",
  slug: "jada-facer-nothing-personal",
  title: "Nothing Personal",
  partOfCollections: ["artist/jada-facer"],
  position: 0,
  ownLength: 3.066667,
  ownProgress: 3.066667,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2019-04-25",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1igQzCkfExjHZYCZimf6mc",
      externalLink: "https://open.spotify.com/album/1igQzCkfExjHZYCZimf6mc",
    },
  ],
} as const satisfies Release
