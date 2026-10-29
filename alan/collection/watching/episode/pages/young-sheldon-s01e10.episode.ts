import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const youngSheldonS01e10 = {
  id: "01a1885a-252a-746e-8483-9851624db5be",
  type: "page-type/episode",
  slug: "young-sheldon-s01e10",
  description:
    "When Sheldon moves to Dallas to attend a school for gifted children, the family struggles to cope with his absence.",
  ownLength: 19,
  ownProgress: 0,
  partOfCollections: ["season/young-sheldon-season-1"],
  position: 10,
  publishedAt: "2018-01-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1414930",
      externalLink: "https://www.themoviedb.org/tv/71728/season/1/episode/10",
    },
  ],
  title: "An Eagle Feather, a String Bean, and an Eskimo",
  episodeType: "standard",
  stillPath: "/nWQaSH4LSwdIUbXqveaBprohpHa.jpg",
  voteAverage: 7.2,
  createdAt: "2026-10-29T15:49:31.561Z",
  updatedAt: "2026-10-29T15:49:31.561Z",
} as const satisfies Episode
