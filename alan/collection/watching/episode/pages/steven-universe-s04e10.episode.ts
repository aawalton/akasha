import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const stevenUniverseS04e10 = {
  id: "01a18855-67ea-7d6d-b3c0-66a2dd1fb1c7",
  type: "page-type/episode",
  slug: "steven-universe-s04e10",
  description: "A strange dream prompts Steven to search for answers.",
  ownLength: 12,
  ownProgress: 0,
  partOfCollections: ["season/steven-universe-season-4"],
  position: 10,
  publishedAt: "2017-01-30",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1262278",
      externalLink: "https://www.themoviedb.org/tv/61175/season/4/episode/10",
    },
  ],
  title: "Steven's Dream",
  episodeType: "standard",
  stillPath: "/4g96dYMFYNYgNEgARWGgwz3W6EK.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T15:44:20.963Z",
  updatedAt: "2026-10-29T15:44:20.963Z",
} as const satisfies Episode
