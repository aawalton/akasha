import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const shadowOnTheMesa = {
  id: "01a17499-66a1-7db4-8d08-4cd0fb73f372",
  type: "page-type/movie",
  slug: "shadow-on-the-mesa",
  ownLength: 87,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-mystery"],
  publishedAt: "2013-03-23",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "185457",
      externalLink: "https://www.themoviedb.org/movie/185457",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Shadow on the Mesa",
  genres: ["Adventure", "Western", "Action"],
  imdbId: "tt2195666",
  posterPath: "/5jEtpajfAioSOyXrGvkUN9JKFFR.jpg",
  voteAverage: 6,
  streamingOn: [
    "PixL Amazon Channel",
    "UP Faith & Family Amazon Channel ",
    "UP Faith & Family Apple TV channel",
    "Xumo Play",
  ],
  createdAt: "2026-10-25T19:46:12.764Z",
  updatedAt: "2026-10-25T19:46:12.764Z",
} as const satisfies Movie
