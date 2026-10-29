import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS21e10 = {
  id: "01a1884b-ef83-7fb6-82b9-30c851ee8ae6",
  type: "page-type/episode",
  slug: "ncis-s21e10",
  description:
    "Parker and Knight discover three bodies on an old Navy ship that's about to be sunk and turned into an artificial reef, when they're suddenly locked inside by a mysterious figure.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-21"],
  position: 10,
  publishedAt: "2024-05-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "5293934",
      externalLink: "https://www.themoviedb.org/tv/4614/season/21/episode/10",
    },
  ],
  title: "Reef Madness",
  episodeType: "finale",
  stillPath: "/xTjAC7B0Jy2aVxXwFjXPr5uPJJg.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
