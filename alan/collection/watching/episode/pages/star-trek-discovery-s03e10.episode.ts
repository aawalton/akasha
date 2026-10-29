import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekDiscoveryS03e10 = {
  id: "01a18852-a9f7-766e-810c-f8329570141a",
  type: "page-type/episode",
  slug: "star-trek-discovery-s03e10",
  description:
    "Georgiou uncovers the true depths of the plot against her, leading her to a revelation about how deeply her time on the U.S.S. Discovery truly changed her.",
  ownLength: 49,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-discovery-season-3"],
  position: 10,
  publishedAt: "2020-12-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2387217",
      externalLink: "https://www.themoviedb.org/tv/67198/season/3/episode/10",
    },
  ],
  title: "Terra Firma (2)",
  episodeType: "standard",
  stillPath: "/mOtR0Mp1nlic7VNk0tQi4x8tzTy.jpg",
  voteAverage: 5.9,
  createdAt: "2026-10-29T15:41:21.268Z",
  updatedAt: "2026-10-29T15:41:21.268Z",
} as const satisfies Episode
