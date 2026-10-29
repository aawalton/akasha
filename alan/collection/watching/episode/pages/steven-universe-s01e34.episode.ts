import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const stevenUniverseS01e34 = {
  id: "01a18855-67e6-7a58-bf69-7502687b27da",
  type: "page-type/episode",
  slug: "steven-universe-s01e34",
  description:
    "Steven grows a patch of watermelons shaped like himself, but they soon come to life and attack people.",
  ownLength: 12,
  ownProgress: 0,
  partOfCollections: ["season/steven-universe-season-1"],
  position: 34,
  publishedAt: "2014-11-20",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1016949",
      externalLink: "https://www.themoviedb.org/tv/61175/season/1/episode/34",
    },
  ],
  title: "Watermelon Steven",
  episodeType: "standard",
  stillPath: "/vXZJzQkqsW56KisRQ6jfyxTHxSi.jpg",
  voteAverage: 5.9,
  createdAt: "2026-10-29T15:44:20.963Z",
  updatedAt: "2026-10-29T15:44:20.963Z",
} as const satisfies Episode
