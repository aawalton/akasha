import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const eurekaS02e03 = {
  id: "01a18848-3731-7273-82c1-4a05bd1fb767",
  type: "page-type/episode",
  slug: "eureka-s02e03",
  description:
    'Dr. Whiticus creates an incredible "weather machine" intended to reverse the effects of global warming which instead stirs unexpected results.',
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/eureka-season-2"],
  position: 3,
  publishedAt: "2007-07-24",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "335242",
      externalLink: "https://www.themoviedb.org/tv/4620/season/2/episode/3",
    },
  ],
  title: "Unpredictable",
  episodeType: "standard",
  stillPath: "/xOeHFIAmz9i6zqlomRaz4W6PJR5.jpg",
  voteAverage: 6.7,
  createdAt: "2026-10-29T15:29:56.528Z",
  updatedAt: "2026-10-29T15:29:56.528Z",
} as const satisfies Episode
