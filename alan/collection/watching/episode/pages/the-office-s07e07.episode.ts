import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theOfficeS07e07 = {
  id: "01a18857-c36c-7543-9d03-098177abf24f",
  type: "page-type/episode",
  slug: "the-office-s07e07",
  description:
    "Pam and Jim prepare for Cece's baptism. When Cece goes missing, Jim fears Angela has taken her.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/the-office-season-7"],
  position: 7,
  publishedAt: "2010-11-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "170272",
      externalLink: "https://www.themoviedb.org/tv/2316/season/7/episode/7",
    },
  ],
  title: "Christening",
  episodeType: "standard",
  stillPath: "/x83cMZMj61uJfPEX08I8rSr821V.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-29T15:46:55.461Z",
  updatedAt: "2026-10-29T15:46:55.461Z",
} as const satisfies Episode
