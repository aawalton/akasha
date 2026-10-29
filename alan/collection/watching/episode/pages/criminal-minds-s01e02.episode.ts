import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const criminalMindsS01e02 = {
  id: "01a18883-a8ad-7dfc-8e36-05d3ac5c5785",
  type: "page-type/episode",
  slug: "criminal-minds-s01e02",
  description:
    "The team of investigators tries to capture a serial arsonist who has been terrorizing a college campus.",
  ownLength: 43,
  ownProgress: 43,
  partOfCollections: ["season/criminal-minds-season-1"],
  position: 2,
  publishedAt: "2005-09-28",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "282861",
      externalLink: "https://www.themoviedb.org/tv/4057/season/1/episode/2",
    },
  ],
  title: "Compulsion",
  episodeType: "standard",
  stillPath: "/d46a4eVjnECDSzKGJDNCSRQGrRo.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-29T16:34:52.205Z",
  updatedAt: "2026-10-29T16:34:52.205Z",
} as const satisfies Episode
