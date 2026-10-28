import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const vinlandSagaS02e02 = {
  id: "01a183d4-e9fa-7aeb-a3cf-5905b88afd24",
  type: "page-type/episode",
  slug: "vinland-saga-s02e02",
  description:
    "Einar and Thorfinn are told to convert a wild forest into a wheat field; and if they succeed, they will have the chance to buy their own freedom.",
  ownLength: 26,
  ownProgress: 0,
  partOfCollections: ["season/vinland-saga-season-2"],
  position: 2,
  publishedAt: "2023-01-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4141694",
      externalLink: "https://www.themoviedb.org/tv/88803/season/2/episode/2",
    },
  ],
  title: "Ketil's Farm",
  episodeType: "standard",
  stillPath: "/kARuAybuBELgFlFeADMDuGNNFbg.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-28T18:45:31.256Z",
  updatedAt: "2026-10-28T18:45:31.256Z",
} as const satisfies Episode
