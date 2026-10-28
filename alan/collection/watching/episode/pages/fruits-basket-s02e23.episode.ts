import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const fruitsBasketS02e23 = {
  id: "01a183d3-70a9-7420-baec-e8906d6590a3",
  type: "page-type/episode",
  slug: "fruits-basket-s02e23",
  description:
    "Tohru's class puts on an unconventional retelling of Cinderella at the school culture festival.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/fruits-basket-season-2"],
  position: 23,
  publishedAt: "2020-09-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2409664",
      externalLink: "https://www.themoviedb.org/tv/85991/season/2/episode/23",
    },
  ],
  title: "It's Cinderella-ish",
  episodeType: "standard",
  stillPath: "/mo4B6U81wkaUHmeWk4zU4xnrFeE.jpg",
  voteAverage: 8.4,
  createdAt: "2026-10-28T18:43:54.662Z",
  updatedAt: "2026-10-28T18:43:54.662Z",
} as const satisfies Episode
