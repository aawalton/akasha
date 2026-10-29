import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theOfficeS06e21 = {
  id: "01a18857-c36c-74e5-8383-47833950f009",
  type: "page-type/episode",
  slug: "the-office-s06e21",
  description:
    "Pam and Jim work on their first sales pitch together to Donna, the manager of a local restaurant. But Michael keeps misreading the signals she's putting out. Meanwhile, Dwight encourages Kelly to try out for the minority training program.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/the-office-season-6"],
  position: 21,
  publishedAt: "2010-04-29",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "170197",
      externalLink: "https://www.themoviedb.org/tv/2316/season/6/episode/21",
    },
  ],
  title: "Body Language",
  episodeType: "standard",
  stillPath: "/cHGGrFJD8lyvWeqenTKLEcB1VqP.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T15:46:55.461Z",
  updatedAt: "2026-10-29T15:46:55.461Z",
} as const satisfies Episode
