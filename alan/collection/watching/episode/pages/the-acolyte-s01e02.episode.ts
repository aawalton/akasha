import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theAcolyteS01e02 = {
  id: "01a18855-e4ab-7b36-804f-7e1599d320ce",
  type: "page-type/episode",
  slug: "the-acolyte-s01e02",
  description: "An assassin strikes again, but this time the Jedi are there to attempt capture.",
  ownLength: 39,
  ownProgress: 0,
  partOfCollections: ["season/the-acolyte-season-1"],
  position: 2,
  publishedAt: "2024-06-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "5220947",
      externalLink: "https://www.themoviedb.org/tv/114479/season/1/episode/2",
    },
  ],
  title: "Revenge / Justice",
  episodeType: "standard",
  stillPath: "/ukNUswsOXC8Wfvtu5Q7kp7Knf6b.jpg",
  voteAverage: 4.9,
  createdAt: "2026-10-29T15:44:52.906Z",
  updatedAt: "2026-10-29T15:44:52.906Z",
} as const satisfies Episode
