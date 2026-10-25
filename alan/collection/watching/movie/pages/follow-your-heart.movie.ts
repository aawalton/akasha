import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const followYourHeart = {
  id: "01a1749a-259a-7796-8b99-189447fea3b2",
  type: "page-type/movie",
  slug: "follow-your-heart",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-mystery"],
  publishedAt: "2020-10-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "667682",
      externalLink: "https://www.themoviedb.org/movie/667682",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Follow Your Heart",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt10777644",
  posterPath: "/wrXxERGdMIdaWGOREVM3Wxj6gMA.jpg",
  voteAverage: 6.9,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "Plex",
    "Plex Channel",
    "YouTube TV",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:01.655Z",
  updatedAt: "2026-10-25T19:47:01.655Z",
} as const satisfies Movie
