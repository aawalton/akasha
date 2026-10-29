import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisLosAngelesS06e02 = {
  id: "01a1884a-e0ee-72df-8db2-a41bad4e30de",
  type: "page-type/episode",
  slug: "ncis-los-angeles-s06e02",
  description:
    "The NCIS: LA team find out that one of their own has been compromised as they investigate the murder of a Navy contractor involved in illegal transactions of confidential data.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-los-angeles-season-6"],
  position: 2,
  publishedAt: "2014-10-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1010228",
      externalLink: "https://www.themoviedb.org/tv/17610/season/6/episode/2",
    },
  ],
  title: "Inelegant Heart",
  episodeType: "standard",
  stillPath: "/fjr3Xo1pH0ZczL9xLT7tSB7QR7z.jpg",
  voteAverage: 7.2,
  createdAt: "2026-10-29T15:32:51.047Z",
  updatedAt: "2026-10-29T15:32:51.047Z",
} as const satisfies Episode
