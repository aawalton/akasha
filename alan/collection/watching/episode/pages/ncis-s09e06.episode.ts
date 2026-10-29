import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS09e06 = {
  id: "01a1884b-ef6e-7199-a6ee-c440a55faac1",
  type: "page-type/episode",
  slug: "ncis-s09e06",
  description:
    "An NCIS case changes from accidental death to murder when evidence reveals that a Navy Lieutenant died of forced over-hydration.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-9"],
  position: 6,
  publishedAt: "2011-10-25",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334596",
      externalLink: "https://www.themoviedb.org/tv/4614/season/9/episode/6",
    },
  ],
  title: "Thirst",
  episodeType: "standard",
  stillPath: "/9ZgEVKTMfYz0GY8GYBrQEaA8f5D.jpg",
  voteAverage: 7.4,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
