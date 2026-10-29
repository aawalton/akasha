import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS07e06 = {
  id: "01a1884b-ef6a-7d4c-b0a5-4cdf4d6fb767",
  type: "page-type/episode",
  slug: "ncis-s07e06",
  description:
    "A murder investigation prompts Gibbs and the team to play family counselor to his former mentor, Mike Franks, in the hopes of preventing a bloody international conflict.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-7"],
  position: 6,
  publishedAt: "2009-11-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334548",
      externalLink: "https://www.themoviedb.org/tv/4614/season/7/episode/6",
    },
  ],
  title: "Outlaws and In-Laws",
  episodeType: "standard",
  stillPath: "/trYIp0yUP31z19jFCMXDDmke0aB.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
