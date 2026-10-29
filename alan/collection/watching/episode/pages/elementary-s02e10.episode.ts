import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const elementaryS02e10 = {
  id: "01a1887e-62a7-777c-bcd7-1611d8bf79d2",
  type: "page-type/episode",
  slug: "elementary-s02e10",
  description:
    "When an investigation goes horribly wrong, Sherlock must testify in an official police inquiry which jeopardizes his and Watson’s future with the NYPD",
  ownLength: 43,
  ownProgress: 43,
  partOfCollections: ["season/elementary-season-2"],
  position: 10,
  publishedAt: "2013-12-05",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "968784",
      externalLink: "https://www.themoviedb.org/tv/1415/season/2/episode/10",
    },
  ],
  title: "Tremors",
  episodeType: "standard",
  stillPath: "/hvHtAg5dteiBnqWQXR085F32NoB.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T16:29:06.597Z",
  updatedAt: "2026-10-29T16:29:06.597Z",
} as const satisfies Episode
