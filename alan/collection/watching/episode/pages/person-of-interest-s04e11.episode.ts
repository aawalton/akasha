import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const personOfInterestS04e11 = {
  id: "01a18851-3df7-7f9b-9c25-786c57ef7ea1",
  type: "page-type/episode",
  slug: "person-of-interest-s04e11",
  description:
    "Samaritan launches a cyber-attack on the stock exchange, forcing the team to risk their lives in a desperate mission to stop a global economic catastrophe.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/person-of-interest-season-4"],
  position: 11,
  publishedAt: "2015-01-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1025830",
      externalLink: "https://www.themoviedb.org/tv/1411/season/4/episode/11",
    },
  ],
  title: "If-Then-Else",
  episodeType: "standard",
  stillPath: "/el49C3XbWLvcyC6p693uaHHpYEd.jpg",
  voteAverage: 8.8,
  createdAt: "2026-10-29T15:39:48.082Z",
  updatedAt: "2026-10-29T15:39:48.082Z",
} as const satisfies Episode
