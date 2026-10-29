import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const eurekaS02e05 = {
  id: "01a18848-3731-7496-92a9-febc0f267421",
  type: "page-type/episode",
  slug: "eureka-s02e05",
  description:
    "Falling space debris threatens Eureka residents and Carter turns to high school science fair participants to solve the problem. Specifically, he taps a student science project created to harness the sun's energy. Also, Zoe gets an eco-friendly automobile.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/eureka-season-2"],
  position: 5,
  publishedAt: "2007-08-07",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "335244",
      externalLink: "https://www.themoviedb.org/tv/4620/season/2/episode/5",
    },
  ],
  title: "Duck, Duck Goose",
  episodeType: "standard",
  stillPath: "/tf3RSri89PQl2jy6Dn89a6l9x7t.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-29T15:29:56.528Z",
  updatedAt: "2026-10-29T15:29:56.528Z",
} as const satisfies Episode
