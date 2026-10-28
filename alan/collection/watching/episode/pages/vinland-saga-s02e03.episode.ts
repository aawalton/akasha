import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const vinlandSagaS02e03 = {
  id: "01a183d4-e9fa-7475-8caf-76ed1888c199",
  type: "page-type/episode",
  slug: "vinland-saga-s02e03",
  description:
    "The farm guards convince Ketil’s 17-year-old son that he needs to make his first killing to become a man.",
  ownLength: 26,
  ownProgress: 0,
  partOfCollections: ["season/vinland-saga-season-2"],
  position: 3,
  publishedAt: "2023-01-24",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4141696",
      externalLink: "https://www.themoviedb.org/tv/88803/season/2/episode/3",
    },
  ],
  title: "Snake",
  episodeType: "standard",
  stillPath: "/wyUgkAmFx5YBhex0yEaDw6Hz3YE.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-28T18:45:31.256Z",
  updatedAt: "2026-10-28T18:45:31.256Z",
} as const satisfies Episode
