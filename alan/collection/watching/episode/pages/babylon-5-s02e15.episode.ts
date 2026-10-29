import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const babylon5S02e15 = {
  id: "01a18843-5080-70a0-b691-83574ca73cdf",
  type: "page-type/episode",
  slug: "babylon-5-s02e15",
  description:
    "We see life on Babylon 5 through the eyes of ISN, supplemented by interviews, statistics and even a few commercials.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/babylon-5-the-coming-of-shadows"],
  position: 15,
  publishedAt: "1995-05-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "235869",
      externalLink: "https://www.themoviedb.org/tv/3137/season/2/episode/15",
    },
  ],
  title: "And Now for a Word",
  episodeType: "standard",
  stillPath: "/xB90x0OGTLJYAm4C3amqgR15BN2.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-29T15:24:35.325Z",
  updatedAt: "2026-10-29T15:24:35.325Z",
} as const satisfies Episode
