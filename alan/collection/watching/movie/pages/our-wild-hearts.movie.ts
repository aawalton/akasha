import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const ourWildHearts = {
  id: "01a17499-66a0-7988-b127-bd87ac32527d",
  type: "page-type/movie",
  slug: "our-wild-hearts",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-mystery"],
  publishedAt: "2013-03-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "180787",
      externalLink: "https://www.themoviedb.org/movie/180787",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Our Wild Hearts",
  genres: ["Family", "TV Movie"],
  imdbId: "tt1838735",
  posterPath: "/gm9emGWJ8gHeiMxS86ZkVaNHaAJ.jpg",
  voteAverage: 6.6,
  streamingOn: ["Filmzie", "Plex", "Plex Channel", "Runtime", "Tubi TV", "Xumo Play"],
  createdAt: "2026-10-25T19:46:12.764Z",
  updatedAt: "2026-10-25T19:46:12.764Z",
} as const satisfies Movie
