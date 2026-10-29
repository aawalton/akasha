import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekShortTreksS02e02 = {
  id: "01a18853-28f0-79d4-a041-2e86ab3e37f3",
  type: "page-type/episode",
  slug: "star-trek-short-treks-s02e02",
  description:
    "Newly minted Captain Lynne Lucero is excited to take command of the U.S.S. Cabot. That is, until she meets Edward Larkin, an ornery scientist who believes he has found a revolutionary new use for tribbles.",
  ownLength: 14,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-short-treks-season-2"],
  position: 2,
  publishedAt: "2019-10-10",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1947028",
      externalLink: "https://www.themoviedb.org/tv/82491/season/2/episode/2",
    },
  ],
  title: "The Trouble with Edward",
  episodeType: "standard",
  stillPath: "/mx91pqS2Bd5GURpI5IyvohkalKT.jpg",
  voteAverage: 7.2,
  createdAt: "2026-10-29T15:41:53.775Z",
  updatedAt: "2026-10-29T15:41:53.775Z",
} as const satisfies Episode
