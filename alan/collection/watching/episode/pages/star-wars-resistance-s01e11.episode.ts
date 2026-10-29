import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starWarsResistanceS01e11 = {
  id: "01a18853-f9af-7718-b2ac-1c3a822f1302",
  type: "page-type/episode",
  slug: "star-wars-resistance-s01e11",
  description:
    "Neeku adopts a strange sea creature and gets way more than he bargained for when it brings chaos to the platform.",
  ownLength: 25,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-resistance-season-1"],
  position: 11,
  publishedAt: "2019-01-13",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1628208",
      externalLink: "https://www.themoviedb.org/tv/79093/season/1/episode/11",
    },
  ],
  title: "Bibo",
  episodeType: "standard",
  stillPath: "/4JDYlMKfC9upzWdCd1KsfwwGq8D.jpg",
  voteAverage: 6.2,
  createdAt: "2026-10-29T15:42:47.214Z",
  updatedAt: "2026-10-29T15:42:47.214Z",
} as const satisfies Episode
