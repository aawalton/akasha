import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekDiscoveryS03e07 = {
  id: "01a18852-a9f7-7ccc-95e9-4f0dfb59e98c",
  type: "page-type/episode",
  slug: "star-trek-discovery-s03e07",
  description:
    "While grappling with the fallout of her recent actions, and what her future might hold, Burnham agrees to represent the Federation in an intense debate about the release of politically sensitive - but highly valuable - Burn data.",
  ownLength: 50,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-discovery-season-3"],
  position: 7,
  publishedAt: "2020-11-26",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2387214",
      externalLink: "https://www.themoviedb.org/tv/67198/season/3/episode/7",
    },
  ],
  title: "Unification III",
  episodeType: "standard",
  stillPath: "/yaYC9EYUdBM1CJLj1u5pWHrAxVT.jpg",
  voteAverage: 5.8,
  createdAt: "2026-10-29T15:41:21.268Z",
  updatedAt: "2026-10-29T15:41:21.268Z",
} as const satisfies Episode
