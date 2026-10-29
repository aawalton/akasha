import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekDiscoveryS03e08 = {
  id: "01a18852-a9f7-76fb-bc11-646afcfbddf2",
  type: "page-type/episode",
  slug: "star-trek-discovery-s03e08",
  description:
    "Osyraa attacks Book's home planet and the Discovery travels there to help. Stamets and Adira investigate The Burn.",
  ownLength: 47,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-discovery-season-3"],
  position: 8,
  publishedAt: "2020-12-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2387215",
      externalLink: "https://www.themoviedb.org/tv/67198/season/3/episode/8",
    },
  ],
  title: "The Sanctuary",
  episodeType: "standard",
  stillPath: "/8xGLBF0s7ZkOzEDJiMzMtUt8mbn.jpg",
  voteAverage: 5.6,
  createdAt: "2026-10-29T15:41:21.268Z",
  updatedAt: "2026-10-29T15:41:21.268Z",
} as const satisfies Episode
