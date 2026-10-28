import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const kOnS02e04 = {
  id: "01a183da-4479-7887-ba12-7e96431181d8",
  type: "page-type/episode",
  slug: "k-on-s02e04",
  description: "The light music club seniors go on a school field trip to Kyoto.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/k-on-season-2"],
  position: 4,
  publishedAt: "2010-04-28",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "879104",
      externalLink: "https://www.themoviedb.org/tv/42253/season/2/episode/4",
    },
  ],
  title: "Field Trip!",
  episodeType: "standard",
  stillPath: "/d3uUaU2KfPN742N2dnMffahfO3e.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-28T18:51:22.104Z",
  updatedAt: "2026-10-28T18:51:22.104Z",
} as const satisfies Episode
