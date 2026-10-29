import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const friendsS06e03 = {
  id: "01a18848-c2c1-7206-b8a3-3390683c6763",
  type: "page-type/episode",
  slug: "friends-s06e03",
  description:
    'Monica and Chandler disagree over how to redecorate Rachel\'s old room. Joey advertises for a "non-ugly" roommate. Ross is unwilling to accept that he still has feelings for Rachel.',
  ownLength: 22,
  ownProgress: 0,
  partOfCollections: ["season/friends-season-6"],
  position: 3,
  publishedAt: "1999-10-07",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "86782",
      externalLink: "https://www.themoviedb.org/tv/1668/season/6/episode/3",
    },
  ],
  title: "The One with Ross's Denial",
  episodeType: "standard",
  stillPath: "/brF8eLr2ml3UaNMmBVZQ615iyBy.jpg",
  voteAverage: 8.1,
  createdAt: "2026-10-29T15:30:32.248Z",
  updatedAt: "2026-10-29T15:30:32.248Z",
} as const satisfies Episode
