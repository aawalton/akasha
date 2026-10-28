import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const vampireKnightSeason1 = {
  id: "01a183d8-f258-7f8b-b087-359fbae7ae17",
  type: "page-type/season",
  slug: "vampire-knight-season-1",
  description:
    "Yuki is a first-year student at Cross Academy, a prestigious institution that hosts regular classes by day and a school for vampires by night.",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/vampire-knight"],
  position: 1,
  publishedAt: "2008-04-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "28168",
      externalLink: "https://www.themoviedb.org/tv/17149/season/1",
    },
  ],
  title: "Vampire Knight",
  posterPath: "/f6dFMV7lkhA3xuRXyj1anUk6AOu.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-28T18:49:55.542Z",
  updatedAt: "2026-10-28T18:49:55.542Z",
} as const satisfies Season
