import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const goodWitchS07e05 = {
  id: "01a18849-352b-7448-97eb-27652b1fe0bb",
  type: "page-type/episode",
  slug: "good-witch-s07e05",
  description:
    "Joy's dream sends the three Merriwicks on a search for Phillip Harper, Joy's father.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/good-witch-season-7"],
  position: 5,
  publishedAt: "2021-06-13",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2960253",
      externalLink: "https://www.themoviedb.org/tv/61864/season/7/episode/5",
    },
  ],
  title: "The Kite",
  episodeType: "standard",
  stillPath: "/mP0MfsZ9o85aBqeZxVppyKRuntf.jpg",
  voteAverage: 5,
  createdAt: "2026-10-29T15:31:01.543Z",
  updatedAt: "2026-10-29T15:31:01.543Z",
} as const satisfies Episode
