import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const bocchiTheRockS01e05 = {
  id: "01a183d9-6b68-7370-9cfd-9c70c46783cf",
  type: "page-type/episode",
  slug: "bocchi-the-rock-s01e05",
  description:
    "Kessoku Band has their first song and they're ready to play their next concert, but Seika isn't so easily convinced.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/bocchi-the-rock-season-1"],
  position: 5,
  publishedAt: "2022-11-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3989996",
      externalLink: "https://www.themoviedb.org/tv/119100/season/1/episode/5",
    },
  ],
  title: "Flightless Fish",
  episodeType: "standard",
  stillPath: "/zPGwda7qVnEjkKJ542tXaWHtg1h.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-28T18:50:26.535Z",
  updatedAt: "2026-10-28T18:50:26.535Z",
} as const satisfies Episode
