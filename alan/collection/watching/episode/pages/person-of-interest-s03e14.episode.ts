import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const personOfInterestS03e14 = {
  id: "01a18851-3df5-7540-a51c-4111020917aa",
  type: "page-type/episode",
  slug: "person-of-interest-s03e14",
  description:
    "Reese rejoins Finch in New York, but when the team receives the number of a highly skilled antiquities thief, a surprising turn of events finds them planning a heist which could land them all in jail.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/person-of-interest-season-3"],
  position: 14,
  publishedAt: "2014-02-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "971297",
      externalLink: "https://www.themoviedb.org/tv/1411/season/3/episode/14",
    },
  ],
  title: "Provenance",
  episodeType: "standard",
  stillPath: "/ySbIVhr6gIJM0VtXErwlx8vySek.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-29T15:39:48.082Z",
  updatedAt: "2026-10-29T15:39:48.082Z",
} as const satisfies Episode
