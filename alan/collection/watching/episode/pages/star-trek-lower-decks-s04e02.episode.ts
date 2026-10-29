import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekLowerDecksS04e02 = {
  id: "01a18852-f34b-7c62-902a-5c027f38bd22",
  type: "page-type/episode",
  slug: "star-trek-lower-decks-s04e02",
  description:
    "Mariner tries to get demoted, Rutherford tries to get promoted, and Boimler makes a big move.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-lower-decks-season-4"],
  position: 2,
  publishedAt: "2023-09-07",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4696329",
      externalLink: "https://www.themoviedb.org/tv/85948/season/4/episode/2",
    },
  ],
  title: "I Have No Bones Yet I Must Flee",
  episodeType: "standard",
  stillPath: "/4v2lKiVo5DfKEExAV3ehsIX568g.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-29T15:41:40.042Z",
  updatedAt: "2026-10-29T15:41:40.042Z",
} as const satisfies Episode
