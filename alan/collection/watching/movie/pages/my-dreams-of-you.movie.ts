import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const myDreamsOfYou = {
  id: "01a1749a-89aa-7caf-8bb8-d260af4ec2e6",
  type: "page-type/movie",
  slug: "my-dreams-of-you",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2024-08-10",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1310504",
      externalLink: "https://www.themoviedb.org/movie/1310504",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "My Dreams of You",
  genres: ["TV Movie", "Romance"],
  imdbId: "tt33038425",
  posterPath: "/dIrWzP5uLvZhtuDqRuGmjhNZHeS.jpg",
  voteAverage: 4.7,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "YouTube TV",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:27.269Z",
  updatedAt: "2026-10-25T19:47:27.269Z",
} as const satisfies Movie
