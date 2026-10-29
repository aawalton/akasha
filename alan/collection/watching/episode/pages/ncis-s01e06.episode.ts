import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS01e06 = {
  id: "01a1884b-ef62-7fd2-aa00-d91ac1a744fa",
  type: "page-type/episode",
  slug: "ncis-s01e06",
  description:
    "An NCIS agent who used to work under Gibbs asks for the team's help investigating a case where sailors on an aircraft carrier are dying of a drug overdose, but have no history of any kind of drug abuse.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-1"],
  position: 6,
  publishedAt: "2003-11-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334435",
      externalLink: "https://www.themoviedb.org/tv/4614/season/1/episode/6",
    },
  ],
  title: "High Seas",
  episodeType: "standard",
  stillPath: "/y5Nn9AZJcypY5rtu17tcm6qM787.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
