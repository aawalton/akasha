import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisNewOrleansS01e20 = {
  id: "01a1884b-3015-7ced-b6d1-4f25d09835f1",
  type: "page-type/episode",
  slug: "ncis-new-orleans-s01e20",
  description:
    "When a Navy Commander’s car is stolen with his baby inside, the NCIS team must determine if this was a random carjacking or a targeted abduction.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-new-orleans-season-1"],
  position: 20,
  publishedAt: "2015-04-14",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1050310",
      externalLink: "https://www.themoviedb.org/tv/61387/season/1/episode/20",
    },
  ],
  title: "Rock-A-Bye-Baby",
  episodeType: "standard",
  stillPath: "/yUf8sE7ExxaLl9HNRx231y3aSBS.jpg",
  voteAverage: 4.7,
  createdAt: "2026-10-29T15:33:11.316Z",
  updatedAt: "2026-10-29T15:33:11.316Z",
} as const satisfies Episode
