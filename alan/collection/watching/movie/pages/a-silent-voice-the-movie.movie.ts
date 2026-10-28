import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const aSilentVoiceTheMovie = {
  id: "01a183d5-34b2-71aa-aa21-2e878befe841",
  type: "page-type/movie",
  slug: "a-silent-voice-the-movie",
  ownLength: 129,
  ownProgress: 0,
  partOfCollections: ["fandom/a-silent-voice"],
  publishedAt: "2016-09-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "378064",
      externalLink: "https://www.themoviedb.org/movie/378064",
    },
  ],
  title: "A Silent Voice: The Movie",
  createdAt: "2026-10-28T18:45:50.386Z",
  updatedAt: "2026-10-28T18:45:50.386Z",
} as const satisfies Movie
