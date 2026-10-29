import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const stevenUniverseS02e10 = {
  id: "01a18855-67e7-76d3-8c5c-6e8b13b75d94",
  type: "page-type/episode",
  slug: "steven-universe-s02e10",
  description:
    'Ronaldo investigates the Crystal Gems in a web documentary for his "Keep Beach City Weird" blog.',
  ownLength: 12,
  ownProgress: 0,
  partOfCollections: ["season/steven-universe-season-2"],
  position: 10,
  publishedAt: "2015-06-16",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1077654",
      externalLink: "https://www.themoviedb.org/tv/61175/season/2/episode/10",
    },
  ],
  title: "Rising Tides, Crashing Skies",
  episodeType: "standard",
  stillPath: "/oSXeMGRlYR4IbInn6xiWFbXKRVB.jpg",
  voteAverage: 6.4,
  createdAt: "2026-10-29T15:44:20.963Z",
  updatedAt: "2026-10-29T15:44:20.963Z",
} as const satisfies Episode
