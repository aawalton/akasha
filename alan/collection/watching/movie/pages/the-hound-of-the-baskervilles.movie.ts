import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theHoundOfTheBaskervilles = {
  id: "01a17497-195e-7f3a-a8fd-213ef0cd6290",
  type: "page-type/movie",
  slug: "the-hound-of-the-baskervilles",
  ownLength: 90,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2000-10-21",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "25293",
      externalLink: "https://www.themoviedb.org/movie/25293",
      lastSyncedAt: "2026-10-25",
    },
    {
      source: "wikipedia",
      externalLink: "https://en.wikipedia.org/wiki/The_Hound_of_the_Baskervilles_(2000_film)",
    },
  ],
  title: "The Hound of the Baskervilles",
  genres: ["Crime", "Drama", "Mystery", "Thriller", "TV Movie"],
  imdbId: "tt0264695",
  posterPath: "/kOaXPlbnWAGIgcu6amLr7v7yCqK.jpg",
  voteAverage: 6,
  streamingOn: [
    "streaming-service/amazon-prime-video-free-with-ads",
    "streaming-service/cineverse",
    "streaming-service/fubotv",
    "streaming-service/howdy",
    "streaming-service/pluto-tv",
    "streaming-service/the-cw",
    "streaming-service/the-roku-channel",
    "streaming-service/xumo-play",
    "streaming-service/youtube-free",
  ],
  createdAt: "2026-10-25T19:43:41.911Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
