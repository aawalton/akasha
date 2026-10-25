import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const detective = {
  id: "01a17497-3825-7643-a16b-3f8694be4506",
  type: "page-type/movie",
  slug: "detective",
  ownLength: 171,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-mystery"],
  publishedAt: "2005-01-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "75075",
      externalLink: "https://www.themoviedb.org/movie/75075",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Detective",
  genres: ["Crime", "Drama", "Mystery"],
  imdbId: "tt0385400",
  posterPath: "/aFpLV0nXLOJKkigukurFkKN1mSg.jpg",
  voteAverage: 4.5,
  streamingOn: ["Shout! Factory TV"],
  createdAt: "2026-10-25T19:43:49.795Z",
  updatedAt: "2026-10-25T19:43:49.795Z",
} as const satisfies Movie
