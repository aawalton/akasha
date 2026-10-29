import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starWarsResistanceS02e14 = {
  id: "01a18853-f9b0-7d54-8361-1cdbbd8d9eed",
  type: "page-type/episode",
  slug: "star-wars-resistance-s02e14",
  description:
    "Kragan buys a secret weapon to capture the Colossus and take over. When Synara discovers this plan, she tries to warn Kaz and crew, but it may be too late.",
  ownLength: 26,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-resistance-season-2"],
  position: 14,
  publishedAt: "2020-01-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2008964",
      externalLink: "https://www.themoviedb.org/tv/79093/season/2/episode/14",
    },
  ],
  title: "The Mutiny",
  episodeType: "standard",
  stillPath: "/52NiSgP3J5KAVcqS4xxpPSYvGwR.jpg",
  voteAverage: 6.9,
  createdAt: "2026-10-29T15:42:47.214Z",
  updatedAt: "2026-10-29T15:42:47.214Z",
} as const satisfies Episode
