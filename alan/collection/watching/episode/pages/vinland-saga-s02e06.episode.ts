import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const vinlandSagaS02e06 = {
  id: "01a183d4-e9fa-767d-bb02-747e0467bd4d",
  type: "page-type/episode",
  slug: "vinland-saga-s02e06",
  description:
    "Thorfinn and Einar are working themselves to the bone to clear the forest, but there's only so much they can do without the help of horses.",
  ownLength: 26,
  ownProgress: 0,
  partOfCollections: ["season/vinland-saga-season-2"],
  position: 6,
  publishedAt: "2023-02-14",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4148003",
      externalLink: "https://www.themoviedb.org/tv/88803/season/2/episode/6",
    },
  ],
  title: "We Need a Horse",
  episodeType: "standard",
  stillPath: "/2mNJhJqqGMdRUUSjH8rTyvonXHc.jpg",
  voteAverage: 7.4,
  createdAt: "2026-10-28T18:45:31.256Z",
  updatedAt: "2026-10-28T18:45:31.256Z",
} as const satisfies Episode
