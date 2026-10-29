import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const babylon5S04e02 = {
  id: "01a18843-5082-7bff-89e1-603a6530ce73",
  type: "page-type/episode",
  slug: "babylon-5-s04e02",
  description:
    "On Z'ha'dum, Sheridan floats somewhere between life and death. Meanwhile, G'Kar risks imprisonment to try to find Garibaldi.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/babylon-5-no-surrender-no-retreat"],
  position: 2,
  publishedAt: "1996-11-14",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "235878",
      externalLink: "https://www.themoviedb.org/tv/3137/season/4/episode/2",
    },
  ],
  title: "Whatever Happened to Mr. Garibaldi?",
  episodeType: "standard",
  stillPath: "/fhGM5Fp8UW3yDilOHa2m8bOg1O9.jpg",
  voteAverage: 7.667,
  createdAt: "2026-10-29T15:24:35.325Z",
  updatedAt: "2026-10-29T15:24:35.325Z",
} as const satisfies Episode
