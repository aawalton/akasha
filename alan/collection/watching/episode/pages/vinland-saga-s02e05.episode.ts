import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const vinlandSagaS02e05 = {
  id: "01a183d4-e9fa-78eb-8466-0bfa484eccb1",
  type: "page-type/episode",
  slug: "vinland-saga-s02e05",
  description:
    "After the sudden turn of events, young Canute must rise up to claim the throne to a kingdom much reduced and under attack.",
  ownLength: 26,
  ownProgress: 0,
  partOfCollections: ["season/vinland-saga-season-2"],
  position: 5,
  publishedAt: "2023-02-07",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4148002",
      externalLink: "https://www.themoviedb.org/tv/88803/season/2/episode/5",
    },
  ],
  title: "Path of Blood",
  episodeType: "standard",
  stillPath: "/bsl84lrge48qEIMA8TTLTLoDxYX.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-28T18:45:31.256Z",
  updatedAt: "2026-10-28T18:45:31.256Z",
} as const satisfies Episode
