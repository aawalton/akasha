import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const aPrincessForChristmas = {
  id: "01a17499-669c-7e2b-b2b1-ad2386eab749",
  type: "page-type/movie",
  slug: "a-princess-for-christmas",
  ownLength: 91,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2011-12-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "79113",
      externalLink: "https://www.themoviedb.org/movie/79113",
      lastSyncedAt: "2026-10-25",
    },
    { source: "wikipedia", externalLink: "https://en.wikipedia.org/wiki/A_Princess_for_Christmas" },
  ],
  title: "A Princess for Christmas",
  genres: ["Comedy", "Family", "TV Movie", "Romance", "Drama"],
  imdbId: "tt1083448",
  posterPath: "/qv7fx4gW2bNU3eUiwtaxh829Imq.jpg",
  voteAverage: 7.029,
  streamingOn: ["Lionsgate+ Amazon Channel", "Plex", "Plex Channel", "Tubi TV", "YouTube Free"],
  createdAt: "2026-10-25T19:46:12.764Z",
  updatedAt: "2026-10-25T19:46:12.764Z",
} as const satisfies Movie
