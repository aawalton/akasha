import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starWarsRebelsS01e07 = {
  id: "01a18853-ddfc-722b-b2e0-d7cec273a737",
  type: "page-type/episode",
  slug: "star-wars-rebels-s01e07",
  description:
    "Kanan and Ezra try to protect an Imperial deserter by distracting the Imperial forces.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-rebels-season-1"],
  position: 7,
  publishedAt: "2014-11-24",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1014547",
      externalLink: "https://www.themoviedb.org/tv/60554/season/1/episode/7",
    },
  ],
  title: "Gathering Forces",
  episodeType: "standard",
  stillPath: "/tqCSo3ALIZ0U3lE9iUnJiFuBJVA.jpg",
  voteAverage: 8.1,
  createdAt: "2026-10-29T15:42:40.123Z",
  updatedAt: "2026-10-29T15:42:40.123Z",
} as const satisfies Episode
