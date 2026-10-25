import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const accidentalFriendship = {
  id: "01a17499-470a-7ff6-84db-b86121d735ff",
  type: "page-type/movie",
  slug: "accidental-friendship",
  ownLength: 85,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2008-11-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "255681",
      externalLink: "https://www.themoviedb.org/movie/255681",
      lastSyncedAt: "2026-10-25",
    },
    { source: "wikipedia", externalLink: "https://en.wikipedia.org/wiki/Accidental_Friendship" },
  ],
  title: "Accidental Friendship",
  genres: ["Drama", "TV Movie"],
  imdbId: "tt1242861",
  posterPath: "/bW6S9ludpTcvQiFqXFsgpY58NRB.jpg",
  voteAverage: 6.9,
  streamingOn: ["Howdy Amazon Channel", "The Roku Channel", "Tubi TV"],
  createdAt: "2026-10-25T19:46:04.682Z",
  updatedAt: "2026-10-25T19:46:04.682Z",
} as const satisfies Movie
