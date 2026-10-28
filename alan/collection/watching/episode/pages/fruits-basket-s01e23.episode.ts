import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const fruitsBasketS01e23 = {
  id: "01a183d3-70a8-7633-a96c-ed932d37ef2c",
  type: "page-type/episode",
  slug: "fruits-basket-s01e23",
  description: "Tohru comes down with a cold, and the Somas help her while she recovers.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/fruits-basket-season-1"],
  position: 23,
  publishedAt: "2019-09-07",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1839093",
      externalLink: "https://www.themoviedb.org/tv/85991/season/1/episode/23",
    },
  ],
  title: "You Look Well…",
  episodeType: "standard",
  stillPath: "/AvH8eGXLhCr4SfqcS1AyregvSTI.jpg",
  voteAverage: 6.4,
  createdAt: "2026-10-28T18:43:54.662Z",
  updatedAt: "2026-10-28T18:43:54.662Z",
} as const satisfies Episode
