import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const justDesserts = {
  id: "01a17497-3827-7cba-ad17-723944374b5c",
  type: "page-type/movie",
  slug: "just-desserts",
  ownLength: 92,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2004-02-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "40635",
      externalLink: "https://www.themoviedb.org/movie/40635",
      lastSyncedAt: "2026-10-25",
    },
    { source: "wikipedia", externalLink: "https://en.wikipedia.org/wiki/Just_Desserts_(film)" },
  ],
  title: "Just Desserts",
  genres: ["Comedy", "Romance"],
  imdbId: "tt0363728",
  posterPath: "/wpQjwZsPaDp6hUUMY2u6eesPJvf.jpg",
  voteAverage: 6.4,
  streamingOn: ["PixL Amazon Channel", "Xumo Play"],
  createdAt: "2026-10-25T19:43:49.795Z",
  updatedAt: "2026-10-25T19:43:49.795Z",
} as const satisfies Movie
