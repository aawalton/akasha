import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starWarsRebelsS02e03 = {
  id: "01a18853-ddfc-760a-8972-1045f7a21ce6",
  type: "page-type/episode",
  slug: "star-wars-rebels-s02e03",
  description:
    "Ezra, Zeb, Sabine, and Chopper are on a mission to an abandoned medistation in search of supplies when an attack by two of Darth Vader's Inquisitors divides the team.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-rebels-season-2"],
  position: 3,
  publishedAt: "2015-10-28",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1132041",
      externalLink: "https://www.themoviedb.org/tv/60554/season/2/episode/3",
    },
  ],
  title: "Always Two There Are",
  episodeType: "standard",
  stillPath: "/eJWKSUorHIEhX9Crd8MIiCcu68I.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T15:42:40.123Z",
  updatedAt: "2026-10-29T15:42:40.123Z",
} as const satisfies Episode
