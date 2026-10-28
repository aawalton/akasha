import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const psychoPassSeason1 = {
  id: "01a183da-9e72-7922-9f17-aaae12851da0",
  type: "page-type/season",
  slug: "psycho-pass-season-1",
  description:
    'The series takes place in the near future, when it is possible to instantaneously measure and quantify a person\'s state of mind and personality. This information is recorded and processed, and the term "Psycho-Pass" refers to a standard used to measure an individual\'s being. The story centers around the "enforcement officer" Shinya Kougami, who is tasked with managing crime in such a world.',
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/psycho-pass"],
  position: 1,
  publishedAt: "2012-10-12",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "53131",
      externalLink: "https://www.themoviedb.org/tv/43865/season/1",
    },
  ],
  title: "Psycho-Pass Season 1",
  posterPath: "/oVfTwvfRBWPlpkIDg5GqgjoMTLr.jpg",
  voteAverage: 6.9,
  createdAt: "2026-10-28T18:51:45.135Z",
  updatedAt: "2026-10-28T18:51:45.135Z",
} as const satisfies Season
