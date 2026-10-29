import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theMonkeyKingS01e02 = {
  id: "01a18857-876f-702d-be98-c949258d5d7d",
  type: "page-type/episode",
  slug: "the-monkey-king-s01e02",
  description:
    "The goddess Kwan Ying recruits former China-scholar Nick Orton to help her take back a magical manuscript from evil demons.",
  ownLength: 120,
  ownProgress: 0,
  partOfCollections: ["season/the-monkey-king-season-1"],
  position: 2,
  publishedAt: "2001-03-12",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1434523",
      externalLink: "https://www.themoviedb.org/tv/45613/season/1/episode/2",
    },
  ],
  title: "Episode 2",
  episodeType: "finale",
  stillPath: "/ipZ2E68vCT3nHJWyuwrZ7Wu3tSZ.jpg",
  voteAverage: 0,
  createdAt: "2026-10-29T15:46:40.110Z",
  updatedAt: "2026-10-29T15:46:40.110Z",
} as const satisfies Episode
