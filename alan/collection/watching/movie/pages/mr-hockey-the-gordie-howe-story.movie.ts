import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const mrHockeyTheGordieHoweStory = {
  id: "01a17499-66a0-7bb5-8d26-d166a3223a17",
  type: "page-type/movie",
  slug: "mr-hockey-the-gordie-howe-story",
  ownLength: 88,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2013-05-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "191037",
      externalLink: "https://www.themoviedb.org/movie/191037",
      lastSyncedAt: "2026-10-25",
    },
    {
      source: "wikipedia",
      externalLink: "https://en.wikipedia.org/wiki/Mr._Hockey:_The_Gordie_Howe_Story",
    },
  ],
  title: "Mr. Hockey: The Gordie Howe Story",
  genres: ["Drama", "TV Movie"],
  imdbId: "tt0883391",
  posterPath: "/tS13WfN5lzzv3U4bf4l3WZCDuIQ.jpg",
  voteAverage: 6.9,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:12.764Z",
  updatedAt: "2026-10-25T19:46:12.764Z",
} as const satisfies Movie
