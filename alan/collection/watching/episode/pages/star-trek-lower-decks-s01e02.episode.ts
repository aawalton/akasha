import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekLowerDecksS01e02 = {
  id: "01a18852-f34a-757e-8761-1b906b873ded",
  type: "page-type/episode",
  slug: "star-trek-lower-decks-s01e02",
  description:
    "Ensigns Boimler and Mariner embark on a shuttle mission to a Klingon compound while Ensigns Tendi and Rutherford spend time together back on the USS Cerritos.",
  ownLength: 26,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-lower-decks-season-1"],
  position: 2,
  publishedAt: "2020-08-13",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2379180",
      externalLink: "https://www.themoviedb.org/tv/85948/season/1/episode/2",
    },
  ],
  title: "Envoys",
  episodeType: "standard",
  stillPath: "/zT0rLKFtbijTTzkkLzK8SGBeS94.jpg",
  voteAverage: 7,
  createdAt: "2026-10-29T15:41:40.042Z",
  updatedAt: "2026-10-29T15:41:40.042Z",
} as const satisfies Episode
