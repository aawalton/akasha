import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theOfficeS08e12 = {
  id: "01a18857-c36e-75ff-834b-3c461a9c11b7",
  type: "page-type/episode",
  slug: "the-office-s08e12",
  description:
    "After Robert decides to sell his mansion following his divorce, Kevin suggests that he have an office pool party. Erin tries to make Andy jealous by flirting with Dwight. Meanwhile, Robert gives everyone a tour of his massive home.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/the-office-season-8"],
  position: 12,
  publishedAt: "2012-01-19",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "170298",
      externalLink: "https://www.themoviedb.org/tv/2316/season/8/episode/12",
    },
  ],
  title: "Pool Party",
  episodeType: "standard",
  stillPath: "/cpyKfQa8IbewT9nKh5dxyvhHrpt.jpg",
  voteAverage: 7.4,
  createdAt: "2026-10-29T15:46:55.461Z",
  updatedAt: "2026-10-29T15:46:55.461Z",
} as const satisfies Episode
