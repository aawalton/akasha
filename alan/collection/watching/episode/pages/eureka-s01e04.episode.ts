import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const eurekaS01e04 = {
  id: "01a18848-3730-7cfa-92b7-fbf8fbb32dfa",
  type: "page-type/episode",
  slug: "eureka-s01e04",
  description:
    "After hosting a movie party, Spencer is found the next day in the middle of a crop circle, claiming he was abducted by aliens; and then other people who attended the party start to go missing as well. Elsewhere, the legislator responsible for Eureka's funding visits the town, and gets dragged into a Sector 5 experiment...",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/eureka-season-1"],
  position: 4,
  publishedAt: "2006-08-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "335231",
      externalLink: "https://www.themoviedb.org/tv/4620/season/1/episode/4",
    },
  ],
  title: "Alienated",
  episodeType: "standard",
  stillPath: "/tRpzA7lu4Kb98Dl9PwUIdpV1Nyq.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T15:29:56.528Z",
  updatedAt: "2026-10-29T15:29:56.528Z",
} as const satisfies Episode
