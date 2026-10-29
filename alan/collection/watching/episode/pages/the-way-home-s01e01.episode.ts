import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theWayHomeS01e01 = {
  id: "01a18858-c54f-7337-ba4c-89664fd27947",
  type: "page-type/episode",
  slug: "the-way-home-s01e01",
  description:
    "Kat and her teen daughter Alice move in with estranged grandma Del. Escaping the tension, Alice explores the farm and finds herself on a surprising journey.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/the-way-home-season-1"],
  position: 1,
  publishedAt: "2023-01-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3717380",
      externalLink: "https://www.themoviedb.org/tv/201836/season/1/episode/1",
    },
  ],
  title: "Mothers and Daughters",
  episodeType: "standard",
  stillPath: "/gBuwnu14fV8USlru2JRVvF6vIQV.jpg",
  voteAverage: 0,
  createdAt: "2026-10-29T15:48:01.487Z",
  updatedAt: "2026-10-29T15:48:01.487Z",
} as const satisfies Episode
